import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ненавязчивая кнопка быстрого перехода в самое начало.
// Появляется, когда хром навбара уже спрятан скроллом.
const BackToTop = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 600);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })}
            aria-label="Наверх"
            className="fixed bottom-6 right-6 z-[65] w-11 h-11 rounded-full flex items-center justify-center
                text-[#D4AF37] border border-[#D4AF37]/35 backdrop-blur-md
                hover:bg-[#D4AF37]/12 hover:border-[#D4AF37]/70 transition-all duration-300"
            style={{
                backgroundColor: 'color-mix(in srgb, var(--color-bg) 60%, transparent)',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(12px)',
                pointerEvents: show ? 'auto' : 'none',
            }}
        >
            <ArrowUp size={18} strokeWidth={1.8} />
        </button>
    );
};

export default BackToTop;
