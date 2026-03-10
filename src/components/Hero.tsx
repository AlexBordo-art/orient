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

            // Floating animation for the panel
            gsap.to('.hero-panel-wrapper', {
                y: -12,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // 3D Magnetic Hover Effect on the Panel
            const panel = document.querySelector('.hero-panel-container') as HTMLElement;
            if (panel) {
                const handleMouseMove = (e: MouseEvent) => {
                    const rect = panel.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    gsap.to('.hero-panel-inner', {
                        rotateX: -(y / rect.height) * 15,
                        rotateY: (x / rect.width) * 15,
                        duration: 0.5,
                        ease: 'power2.out',
                        transformPerspective: 1000
                    });

                    gsap.to('.glow-blob', {
                        x: x * 0.5,
                        y: y * 0.5,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to('.hero-panel-inner', {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 1,
                        ease: 'elastic.out(1, 0.3)'
                    });
                    gsap.to('.glow-blob', {
                        x: 0,
                        y: 0,
                        duration: 1,
                        ease: 'power2.out'
                    });
                };

                panel.addEventListener('mousemove', handleMouseMove);
                panel.addEventListener('mouseleave', handleMouseLeave);
            }

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

                <div className="hero-panel-wrapper">
                    <div className="hero-panel-container max-w-2xl relative w-full" style={{ perspective: '1000px' }}>

                        {/* Glow Design Blob behind the panel */}
                        <div className="glow-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sapphire-light/30 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }} />
                        <div className="glow-blob absolute top-1/4 right-1/4 w-[80%] h-[80%] bg-champagne-light/20 rounded-full blur-[80px] pointer-events-none -z-10 mix-blend-screen opacity-0 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }} />

                        <div className="hero-panel-inner glass-panel p-8 md:p-10 lg:p-12 w-full flex flex-col shadow-2xl backdrop-blur-2xl border border-white/15 bg-obsidian-dark/40" style={{ transformStyle: 'preserve-3d' }}>
                            {/* Inner content floats slightly above the glass */}
                            <div style={{ transform: 'translateZ(30px)' }}>

                                {/* Badge */}
                                <div className="reveal-badge inline-flex items-center gap-3 bg-obsidian/70 backdrop-blur-md border border-champagne/40 px-4 py-2 rounded-full mb-6 w-max shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-light opacity-80" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne text-[10px] items-center justify-center shadow-[0_0_10px_#D4AF37]" />
                                    </span>
                                    <span className="text-champagne-light text-xs font-mono tracking-widest uppercase font-semibold">
                                        С 2007 года · Хабаровск · Москва
                                    </span>
                                </div>

                                {/* Headline */}
                                <div className="flex flex-col gap-0 mb-5" style={{ transform: 'translateZ(50px)' }}>
                                    <div className="overflow-hidden">
                                        <h1 className="reveal-text text-white font-sans font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.05] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                            Мир открыт.
                                        </h1>
                                    </div>
                                    <div className="overflow-hidden">
                                        <h1 className="reveal-text text-champagne font-heading italic font-normal text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] tracking-tight leading-[0.9] mt-1 drop-shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                                            Границ нет.
                                        </h1>
                                    </div>
                                </div>

                                {/* Subtitle */}
                                <div className="overflow-hidden mb-6 w-full md:max-w-lg" style={{ transform: 'translateZ(20px)' }}>
                                    <p className="reveal-text text-slate-200 text-sm sm:text-base font-sans font-light leading-relaxed">
                                        Визы, путешествия и образование за рубежом — <strong className="text-white font-medium">без очередей, ошибок и отказов.</strong> Мы берём всё на себя.
                                    </p>
                                </div>

                                {/* Social Proof — single clean row */}
                                <div className="reveal-text flex items-center gap-4 mb-6 flex-wrap" style={{ transform: 'translateZ(40px)' }}>
                                    <a
                                        href="https://2gis.ru/khabarovsk/firm/4926340373575901/tab/reviews"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.15] border border-white/20 hover:border-champagne/40 rounded-full px-4 py-2 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                    >
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-champagne text-champagne drop-shadow-[0_0_5px_#D4AF37]" />
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
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>

                                {/* CTA */}
                                <div className="reveal-text flex flex-col sm:flex-row items-start sm:items-center gap-3" style={{ transform: 'translateZ(60px)' }}>
                                    <button className="btn-premium w-full sm:w-auto overflow-hidden relative group">
                                        <span className="relative z-10 font-bold tracking-wide">Получить консультацию</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite] z-0" />
                                    </button>
                                    <button className="w-full sm:w-auto px-5 py-3 rounded-full border border-champagne/30 text-champagne text-sm font-medium hover:bg-champagne/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all">
                                        Узнать стоимость →
                                    </button>
                                </div>

                                {/* Risk reversal */}
                                <div className="overflow-hidden mt-4">
                                    <p className="text-slate-400/80 hover:text-slate-300 transition-colors text-[11px] reveal-text">
                                        Бесплатно · Ответ за 15 минут · Возврат при отказе консульства
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
