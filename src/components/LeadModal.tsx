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
                className="modal-overlay absolute inset-0 bg-charcoal/80"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="modal-content relative w-full max-w-4xl bg-cream rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">

                {/* Left Side: Trust & Info */}
                <div className="bg-primary text-cream p-10 lg:p-14 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full filter blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10">
                        <span className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4 block">Визовая поддержка</span>
                        <h3 className="font-heading italic text-3xl lg:text-4xl mb-6">Оформление визы.</h3>
                        <p className="font-sans text-sm opacity-80 leading-relaxed mb-8">
                            Оставьте данные. Наш визовый эксперт проведет аудит вашего кейса и предложит оптимальную стратегию одобрения.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-5">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={24} className="text-accent" />
                            <span className="font-sans text-sm uppercase tracking-wide">Конфиденциально</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={24} className="text-accent" />
                            <span className="font-sans text-sm uppercase tracking-wide">Анализ за 15 мин</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-10 lg:p-14 md:w-3/5 bg-white relative flex flex-col justify-center">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-charcoal/40 hover:text-charcoal transition-colors rounded-full hover:bg-charcoal/5"
                    >
                        <X size={20} />
                    </button>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal/60">Полное имя</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-cream border border-charcoal/10 rounded-xl px-4 py-3 text-charcoal font-sans focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal/60">Телефон</label>
                            <input
                                required
                                type="tel"
                                placeholder="+7 ___ ___ __ __"
                                className="w-full bg-cream border border-charcoal/10 rounded-xl px-4 py-3 text-charcoal font-sans focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-sans font-bold uppercase tracking-wider text-charcoal/60">Цель поездки</label>
                            <select className="w-full bg-cream border border-charcoal/10 rounded-xl px-4 py-3 text-charcoal font-sans focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                                <option>Бизнес Виза (Китай, Япония)</option>
                                <option>Туризм</option>
                                <option>Оформление карты АТЭС</option>
                                <option>Сложный случай / Отказ</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={submitted}
                            className={`mt-4 w-full py-4 rounded-xl font-sans font-bold flex items-center justify-center gap-2 transition-all duration-300
                                ${submitted
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-obsidian-dark text-white hover:bg-champagne hover:text-obsidian-dark hover:-translate-y-1 shadow-lg'
                                }`}
                        >
                            {submitted ? '✓ Заявка принята' : 'Начать оформление'}
                            {!submitted && <Send size={18} />}
                        </button>

                        <p className="text-center text-[10px] text-charcoal/40 font-sans mt-2">
                            Нажимая кнопку, вы соглашаетесь с условиями хранения персональных данных.
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LeadModal;
