import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Clock } from 'lucide-react';
import gsap from 'gsap';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo('.modal-overlay',
                { opacity: 0, backdropFilter: 'blur(0px)' },
                { opacity: 1, backdropFilter: 'blur(20px)', duration: 0.6, ease: 'power3.out' }
            );
            gsap.fromTo('.modal-content',
                { opacity: 0, y: 100, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0.1 }
            );
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="modal-overlay absolute inset-0"
                style={{ background: 'rgba(2,6,23,0.78)' }}
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className="modal-content relative w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] border border-t-glass-border"
                style={{ background: 'var(--color-bg-elevated)' }}
            >

                {/* Left Side: Trust & Info */}
                <div className="p-10 lg:p-14 md:w-2/5 flex flex-col justify-between relative overflow-hidden bg-t-bg text-t-text">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full filter blur-[80px] -translate-y-1/2 translate-x-1/2" style={{ background: 'var(--color-accent-strong)', opacity: 0.2 }}></div>

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

                {/* Right Side: Form */}
                <div className="p-10 lg:p-14 md:w-3/5 relative flex flex-col justify-center bg-t-elevated">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-t-muted hover:text-t-text transition-colors rounded-full hover:bg-t-glass"
                    >
                        <X size={20} />
                    </button>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
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
                            className={`mt-4 w-full py-4 rounded-xl font-mono font-bold text-[11px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300
                                ${submitted
                                    ? 'bg-emerald-600 text-white'
                                    : 'btn-premium'
                                }`}
                        >
                            {submitted ? '✓ Заявка принята' : 'Начать оформление'}
                            {!submitted && <Send size={16} />}
                        </button>

                        <p className="text-center text-[10px] text-t-subtle font-sans mt-2">
                            Нажимая кнопку, вы соглашаетесь с условиями хранения персональных данных.
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LeadModal;
