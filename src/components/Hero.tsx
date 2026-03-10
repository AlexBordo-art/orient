import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

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
                y: -10,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <section
            className="relative min-h-[100dvh] w-full flex items-end justify-center lg:justify-start pb-16 lg:pb-24 pt-28 overflow-hidden bg-transparent"
            ref={containerRef}
        >
            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Glass Panel — pushed below navbar with section pt-28 */}
                <div className="hero-panel glass-panel p-8 md:p-12 lg:p-14 max-w-3xl flex flex-col will-change-transform shadow-2xl backdrop-blur-3xl border border-white/20">

                    {/* Badge — Real data: С 2007 года (from orient-dv.ru OG description) */}
                    <div className="reveal-badge inline-flex items-center gap-3 bg-obsidian/40 backdrop-blur-md border border-champagne/30 px-4 py-2 rounded-full mb-8 w-max">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-light opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne" />
                        </span>
                        <span className="text-champagne-light text-xs font-mono tracking-widest uppercase font-semibold">
                            Визовое бюро · С 2007 года
                        </span>
                    </div>

                    {/* Headline — PAS: Loss Aversion trigger */}
                    <div className="flex flex-col gap-0 mb-6" style={{ perspective: '1000px' }}>
                        <div className="overflow-hidden">
                            <h1 className="reveal-text text-slate-100 font-sans font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tighter leading-none">
                                Мир открыт.
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="reveal-text text-champagne font-heading italic font-normal text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] tracking-tight leading-[0.85] pr-4 mt-2">
                                Границ нет.
                            </h1>
                        </div>
                    </div>

                    {/* Subtitle — Benefit-first, customer language */}
                    <div className="overflow-hidden mb-8 w-full md:max-w-xl">
                        <p className="reveal-text text-slate-300 text-base sm:text-lg font-sans font-light leading-relaxed">
                            Визы, путешествия и образование за рубежом — <strong className="text-white font-medium">без очередей, ошибок и отказов.</strong> Мы берём всё на себя.
                        </p>
                    </div>

                    {/* Real Social Proof — Data from 2GIS: 5.0★ / 97 оценок */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
                        <div className="flex gap-6 sm:gap-8 overflow-hidden flex-wrap">
                            {/* 2GIS Rating — verified real data */}
                            <a
                                href="https://2gis.ru/khabarovsk/firm/4926340373575901/tab/reviews"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reveal-text flex flex-col group cursor-pointer"
                                title="Читать отзывы на 2GIS"
                            >
                                <div className="flex items-center gap-1.5">
                                    <span className="text-champagne font-heading text-2xl sm:text-3xl font-semibold">5.0</span>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-champagne text-champagne" />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-slate-400 font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold group-hover:text-champagne transition-colors">
                                    97 оценок · 2GIS
                                </span>
                            </a>
                            <div className="w-px h-10 sm:h-12 bg-white/10 reveal-text"></div>
                            <div className="reveal-text flex flex-col">
                                <span className="text-champagne font-heading text-2xl sm:text-3xl font-semibold">17+</span>
                                <span className="text-slate-400 font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Лет работы</span>
                            </div>
                            <div className="w-px h-10 sm:h-12 bg-white/10 reveal-text hidden sm:block"></div>
                            <a
                                href="https://yandex.ru/maps/org/oriyent_ekspress/1032200453/reviews/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reveal-text flex flex-col group cursor-pointer hidden sm:flex"
                                title="Читать отзывы на Яндекс Картах"
                            >
                                <span className="text-champagne font-heading text-2xl sm:text-3xl font-semibold">90+</span>
                                <span className="text-slate-400 font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold group-hover:text-champagne transition-colors">
                                    Отзывов
                                </span>
                            </a>
                        </div>

                        {/* CTA — Commitment Ladder: low-friction first */}
                        <div className="reveal-text flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                            <button className="btn-premium w-full sm:w-auto">
                                Получить консультацию
                            </button>
                            <button className="w-full sm:w-auto px-6 py-3 rounded-full border border-champagne/30 text-champagne text-sm font-medium hover:bg-champagne/10 transition-all">
                                Узнать стоимость →
                            </button>
                        </div>
                    </div>
                    {/* Micro social proof — Risk Reversal with real data */}
                    <p className="text-slate-500 text-xs mt-4 reveal-text">
                        Бесплатно · Ответ за 15 минут · Возврат при отказе консульства
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Hero;
