import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'oe_chat_btn_pos';
const SIZE = 56;
const MARGIN = 20;

type Pos = { x: number; y: number };

const defaultPos = (): Pos => ({
    x: window.innerWidth - SIZE - MARGIN,
    y: window.innerHeight - SIZE - MARGIN,
});

const clamp = (p: Pos): Pos => ({
    x: Math.max(MARGIN, Math.min(window.innerWidth - SIZE - MARGIN, p.x)),
    y: Math.max(MARGIN, Math.min(window.innerHeight - SIZE - MARGIN, p.y)),
});

const ChatButton: React.FC = () => {
    const [pos, setPos] = useState<Pos>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return clamp(JSON.parse(raw));
        } catch { /* noop */ }
        return defaultPos();
    });
    const [dragging, setDragging] = useState(false);
    const startRef = useRef<{ px: number; py: number; ox: number; oy: number; moved: boolean } | null>(null);

    useEffect(() => {
        const onResize = () => setPos(p => clamp(p));
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const beginDrag = (px: number, py: number) => {
        startRef.current = { px, py, ox: pos.x, oy: pos.y, moved: false };
        setDragging(true);
    };

    const moveDrag = (px: number, py: number) => {
        const s = startRef.current;
        if (!s) return;
        const dx = px - s.px;
        const dy = py - s.py;
        if (!s.moved && Math.hypot(dx, dy) > 4) s.moved = true;
        if (s.moved) setPos(clamp({ x: s.ox + dx, y: s.oy + dy }));
    };

    const endDrag = () => {
        const s = startRef.current;
        setDragging(false);
        startRef.current = null;
        if (s) {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pos)); } catch { /* noop */ }
        }
    };

    useEffect(() => {
        if (!dragging) return;
        const onMove = (e: MouseEvent) => moveDrag(e.clientX, e.clientY);
        const onUp = () => endDrag();
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onTouchEnd = () => endDrag();
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [dragging]); // eslint-disable-line react-hooks/exhaustive-deps

    const onClick = () => {
        if (startRef.current?.moved) return;
        // TODO: chat opens here (Matrix bus, later)
        console.log('[chat] click — placeholder');
    };

    return (
        <button
            aria-label="Чат"
            onMouseDown={(e) => beginDrag(e.clientX, e.clientY)}
            onTouchStart={(e) => {
                if (e.touches[0]) beginDrag(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onClick={onClick}
            style={{
                position: 'fixed',
                left: pos.x,
                top: pos.y,
                width: SIZE,
                height: SIZE,
                zIndex: 100,
                touchAction: 'none',
                cursor: dragging ? 'grabbing' : 'grab',
                transition: dragging ? 'none' : 'box-shadow 300ms var(--ease-cinematic, cubic-bezier(0.4,0,0.2,1))',
            }}
            className="rounded-full flex items-center justify-center border border-t-strong/40 bg-t-glass backdrop-blur-md text-t-strong hover:border-t-strong hover:shadow-[0_8px_30px_rgba(212,175,55,0.35)] select-none"
        >
            <MessageCircle size={22} strokeWidth={1.5} />
        </button>
    );
};

export default ChatButton;
