import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Staggered reveal for typography
            tl.fromTo('.reveal-text',
                { y: 100, opacity: 0, rotateX: -10 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.6, stagger: 0.15, ease: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 0.3 }
            );

            // Subtle scale for the badge
            tl.fromTo('.reveal-badge',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
                "-=1.2"
            );

            // Floating animation for outer panel
            gsap.to('.hero-panel', {
                y: -15,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <section
            className="relative h-[100dvh] w-full flex items-center lg:items-end justify-center lg:justify-start pb-16 lg:pb-32 overflow-hidden bg-transparent"
            ref={containerRef}
        >
            {/* Content Container (Bottom-Left Third) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Floating Glass Panel around content to separate it deeply from the background */}
                <div className="hero-panel glass-panel p-8 md:p-12 lg:p-14 max-w-3xl flex flex-col will-change-transform shadow-2xl backdrop-blur-3xl border border-white/20">

                    {/* Badge — Specificity Bias: concrete positioning, not vague */}
                    <div className="reveal-badge inline-flex items-center gap-3 bg-obsidian/40 backdrop-blur-md border border-champagne/30 px-4 py-2 rounded-full mb-8 w-max">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-light opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne" />
                        </span>
                        <span className="text-champagne-light text-xs font-mono tracking-widest uppercase font-semibold">
                            Визовое бюро · С 2010 года
                        </span>
                    </div>

                    {/* Headline — PAS: Problem-Agitate-Solution compressed into 2 lines */}
                    {/* Loss Aversion: "Мир открыт" implies you're missing out if you don't act */}
                    <div className="flex flex-col gap-0 mb-6" style={{ perspective: '1000px' }}>
                        <div className="overflow-hidden">
                            <h1 className="reveal-text text-slate-100 font-sans font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tighter leading-none">
                                Мир открыт.
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="reveal-text text-champagne font-heading italic font-normal text-[4.5rem] sm:text-[7rem] lg:text-[9rem] tracking-tight leading-[0.8] pr-4 mt-2">
                                Границ нет.
                            </h1>
                        </div>
                    </div>

                    {/* Subtitle — Benefit-first, customer language, not company language */}
                    <div className="overflow-hidden mb-10 w-full md:max-w-xl">
                        <p className="reveal-text text-slate-300 text-lg sm:text-xl font-sans font-light leading-relaxed">
                            Визы, путешествия и образование за рубежом — <strong className="text-white font-medium">без очередей, ошибок и отказов.</strong> Мы берём всё на себя.
                        </p>
                    </div>

                    {/* Metrics — Specificity Bias: concrete numbers build instant trust */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-6 border-t border-white/10">
                        <div className="flex gap-8 overflow-hidden">
                            <div className="reveal-text flex flex-col">
                                <span className="text-champagne font-heading text-3xl font-semibold">99.8%</span>
                                <span className="text-slate-400 font-sans text-xs uppercase tracking-wider font-semibold">Одобрений</span>
                            </div>
                            <div className="w-px h-12 bg-white/10 reveal-text"></div>
                            <div className="reveal-text flex flex-col">
                                <span className="text-champagne font-heading text-3xl font-semibold">12+</span>
                                <span className="text-slate-400 font-sans text-xs uppercase tracking-wider font-semibold">Лет опыта</span>
                            </div>
                        </div>

                        {/* CTA — Commitment Ladder: low-friction first, high-friction second */}
                        {/* Copywriting: action verb + what they get, not what they do */}
                        <div className="reveal-text flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                            <button className="btn-premium w-full sm:w-auto">
                                Получить консультацию
                            </button>
                            <button className="w-full sm:w-auto px-6 py-3 rounded-full border border-champagne/30 text-champagne text-sm font-medium hover:bg-champagne/10 transition-all">
                                Узнать стоимость →
                            </button>
                        </div>
                    </div>
                    {/* Micro social proof — Risk Reversal: removes 3 fears simultaneously */}
                    <p className="text-slate-500 text-xs mt-4 reveal-text">
                        Бесплатно · Ответ за 15 минут · Возврат при отказе консульства
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Hero;
