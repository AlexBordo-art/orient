import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ShieldCheck, Clock } from 'lucide-react';
import gsap from 'gsap';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    // For swipe-to-close on mobile
    const dragStartY = useRef<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // iOS-correct body lock: freeze scroll position with position:fixed
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overscrollBehavior = 'none';

            gsap.fromTo('.modal-overlay',
                { opacity: 0, backdropFilter: 'blur(0px)' },
                { opacity: 1, backdropFilter: 'blur(20px)', duration: 0.6, ease: 'power3.out' }
            );
            gsap.fromTo('.modal-content',
                { opacity: 0, y: 100, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0.1 }
            );
        } else {
            // Restore scroll position on unlock
            const scrollY = parseInt(document.body.style.top || '0') * -1;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overscrollBehavior = '';
            if (scrollY) window.scrollTo(0, scrollY);
        }
        return () => {
            // Safety cleanup if component unmounts while open
            const scrollY = parseInt(document.body.style.top || '0') * -1;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overscrollBehavior = '';
            if (scrollY) window.scrollTo(0, scrollY);
        };
    }, [isOpen]);

    // Swipe-to-close: track touch on the drag handle / modal content
    const handleTouchStart = (e: React.TouchEvent) => {
        dragStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (dragStartY.current === null) return;
        const delta = e.changedTouches[0].clientY - dragStartY.current;
        if (delta > 80) onClose(); // swipe down ≥ 80px → close
        dragStartY.current = null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
            {/* Overlay */}
            <div
                className="modal-overlay absolute inset-0"
                style={{ background: 'rgba(2,6,23,0.78)' }}
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                ref={contentRef}
                className="modal-content relative w-full max-w-4xl
                    rounded-t-[2rem] sm:rounded-[2rem]
                    shadow-2xl overflow-hidden
                    flex flex-col md:flex-row
                    max-h-[92dvh] overflow-y-auto
                    border border-t-glass-border"
                style={{ background: 'var(--color-bg-elevated)' }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Drag handle — mobile only */}
                <div className="flex justify-center pt-3 pb-1 md:hidden absolute top-0 left-0 right-0 z-10">
                    <div className="w-9 h-1 rounded-full bg-t-text/20" />
                </div>

                {/* Left Side: Trust & Info — hidden on mobile, shown md+ */}
                <div className="hidden md:flex p-10 lg:p-14 md:w-2/5 flex-col justify-between relative overflow-hidden bg-t-bg text-t-text">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full filter blur-[80px] -translate-y-1/2 translate-x-1/2"
                        style={{ background: 'var(--color-accent-strong)', opacity: 0.2 }}>
                    </div>

                    <div className="relative z-10">
                        <span className="font-mono text-xs tracking-widest uppercase text-t-strong opacity-80 mb-4 block">Визовая поддержка</span>
                        <h3 className="font-heading italic text-3xl lg:text-4xl mb-6">Оформление визы.</h3>
                        <p className="font-sans text-sm text-t-muted leading-relaxed mb-8">
                            Оставьте данные. Наш визовый эксперт проведет аудит вашего кейса и предложит оптимальную стратегию одобрения.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-5">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={22} className="text-t-strong" strokeWidth={1.5} />
                            <span className="font-sans text-sm uppercase tracking-wide text-t-muted">Конфиденциально</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={22} className="text-t-strong" strokeWidth={1.5} />
                            <span className="font-sans text-sm uppercase tracking-wide text-t-muted">Анализ за 15 мин</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form — full width on mobile */}
                <div className="p-7 sm:p-10 lg:p-14 w-full md:w-3/5 relative flex flex-col justify-center bg-t-elevated pt-10 md:pt-10">
                    {/* Mobile: brief trust line above form */}
                    <div className="flex items-center gap-4 mb-5 md:hidden">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-t-strong opacity-80">Визовая поддержка</span>
                        <span className="text-t-subtle text-[10px] font-mono">· Ответ за 15 мин</span>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Закрыть"
                        className="absolute top-4 right-4 sm:top-6 sm:right-6
                            min-w-[44px] min-h-[44px] flex items-center justify-center
                            text-t-muted hover:text-t-text transition-colors rounded-full hover:bg-t-glass"
                    >
                        <X size={20} />
                    </button>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
                        <div className="space-y-1.5">
                            <label className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-t-muted">Полное имя</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-t-glass border border-t-border rounded-xl px-4 py-3 text-t-text font-sans focus:outline-none focus:border-t-strong transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-t-muted">Телефон</label>
                            <input
                                required
                                type="tel"
                                placeholder="+7 ___ ___ __ __"
                                className="w-full bg-t-glass border border-t-border rounded-xl px-4 py-3 text-t-text font-sans focus:outline-none focus:border-t-strong transition-colors placeholder:text-t-subtle"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-t-muted">Цель поездки</label>
                            <select className="w-full bg-t-glass border border-t-border rounded-xl px-4 py-3 text-t-text font-sans focus:outline-none focus:border-t-strong transition-colors appearance-none">
                                <option>Бизнес Виза (Китай, Япония)</option>
                                <option>Туризм</option>
                                <option>Оформление карты АТЭС</option>
                                <option>Сложный случай / Отказ</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={submitted}
                            className={`mt-2 w-full py-4 rounded-xl font-mono font-bold text-[11px] tracking-[0.25em] uppercase
                                flex items-center justify-center gap-2 transition-all duration-300
                                ${submitted ? 'bg-emerald-600 text-white' : 'btn-premium'}`}
                        >
                            {submitted ? '✓ Заявка принята' : 'Начать оформление'}
                            {!submitted && <Send size={16} />}
                        </button>

                        <p className="text-center text-[10px] text-t-subtle font-sans">
                            Нажимая кнопку, вы соглашаетесь с условиями хранения персональных данных.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeadModal;
