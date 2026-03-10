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

            tl.fromTo('.reveal-text',
                { y: 80, opacity: 0, rotateX: -8 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.12, ease: "cubic-bezier(0.16, 1, 0.3, 1)", delay: 0.3 }
            );

            tl.fromTo('.reveal-badge',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
                "-=1.2"
            );

            gsap.to('.hero-panel', {
                y: -8,
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
            className="relative min-h-[100dvh] w-full flex items-end justify-center lg:justify-start pb-12 lg:pb-20 pt-28 overflow-hidden"
            ref={containerRef}
        >
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.webp"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-dark via-obsidian-dark/70 to-obsidian-dark/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian-dark/80 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="hero-panel glass-panel p-8 md:p-10 lg:p-12 max-w-2xl flex flex-col will-change-transform shadow-2xl backdrop-blur-2xl border border-white/15">

                    {/* Badge */}
                    <div className="reveal-badge inline-flex items-center gap-3 bg-obsidian/50 backdrop-blur-md border border-champagne/30 px-4 py-2 rounded-full mb-6 w-max">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-light opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne" />
                        </span>
                        <span className="text-champagne-light text-xs font-mono tracking-widest uppercase font-semibold">
                            С 2007 года · Хабаровск · Москва
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="flex flex-col gap-0 mb-5" style={{ perspective: '1000px' }}>
                        <div className="overflow-hidden">
                            <h1 className="reveal-text text-white font-sans font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.05]">
                                Мир открыт.
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="reveal-text text-champagne font-heading italic font-normal text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] tracking-tight leading-[0.9] mt-1">
                                Границ нет.
                            </h1>
                        </div>
                    </div>

                    {/* Subtitle */}
                    <div className="overflow-hidden mb-6 w-full md:max-w-lg">
                        <p className="reveal-text text-slate-300 text-sm sm:text-base font-sans font-light leading-relaxed">
                            Визы, путешествия и образование за рубежом — <strong className="text-white font-medium">без очередей, ошибок и отказов.</strong> Мы берём всё на себя.
                        </p>
                    </div>

                    {/* Social Proof — single clean row */}
                    <div className="reveal-text flex items-center gap-4 mb-6 flex-wrap">
                        <a
                            href="https://2gis.ru/khabarovsk/firm/4926340373575901/tab/reviews"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 rounded-full px-4 py-2 transition-colors group"
                        >
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-champagne text-champagne" />
                                ))}
                            </div>
                            <span className="text-white text-sm font-semibold">5.0</span>
                            <span className="text-slate-400 text-xs">·</span>
                            <span className="text-slate-400 text-xs group-hover:text-champagne transition-colors">97 оценок на 2GIS</span>
                        </a>
                        <a
                            href="https://yandex.ru/maps/org/oriyent_ekspress/1032200453/reviews/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-champagne transition-colors text-xs"
                        >
                            <span>90+ отзывов на Яндексе</span>
                            <span>→</span>
                        </a>
                    </div>

                    {/* CTA */}
                    <div className="reveal-text flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <button className="btn-premium w-full sm:w-auto">
                            Получить консультацию
                        </button>
                        <button className="w-full sm:w-auto px-5 py-3 rounded-full border border-champagne/30 text-champagne text-sm font-medium hover:bg-champagne/10 transition-all">
                            Узнать стоимость →
                        </button>
                    </div>

                    {/* Risk reversal */}
                    <p className="text-slate-500 text-[11px] mt-3 reveal-text">
                        Бесплатно · Ответ за 15 минут · Возврат при отказе консульства
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Hero;
