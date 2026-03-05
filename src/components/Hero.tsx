import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Staggered reveal for typography
            tl.fromTo('.reveal-text',
                { y: 100, opacity: 0, rotateX: -10 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.6, stagger: 0.15, ease: "cubic-bezier(0.34, 1.56, 0.64, 1)", delay: 0.3 }
            );

            // Subtle scale for the badge
            tl.fromTo('.reveal-badge',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
                "-=1.2"
            );

            // Removed parallax as GlobalBackground handles it
        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <section
            className="relative h-[100dvh] w-full flex items-end pb-16 lg:pb-24 overflow-hidden bg-transparent"
            ref={containerRef}
        >
            {/* Content Container (Bottom-Left Third) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-2xl flex flex-col" ref={textRef}>

                    {/* Badge */}
                    <div className="reveal-badge inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 w-max">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                        </span>
                        <span className="text-cream text-xs font-data tracking-widest uppercase">
                            Официальный Визовый Протокол
                        </span>
                    </div>

                    {/* Headline Matrix */}
                    <div className="flex flex-col gap-0 mb-8" style={{ perspective: '1000px' }}>
                        <div className="overflow-hidden">
                            <h1 className="reveal-text text-cream font-sans font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tighter leading-none">
                                Ваш протокол для
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="reveal-text text-accent font-drama italic font-normal text-[5rem] sm:text-[8rem] lg:text-[11rem] tracking-tight leading-[0.8] pr-4">
                                Азии.
                            </h1>
                        </div>
                    </div>

                    {/* Subtitle / Value Proposition */}
                    <div className="overflow-hidden mb-8">
                        <p className="reveal-text text-cream/70 text-lg sm:text-xl font-sans font-light max-w-lg leading-relaxed">
                            Оформление виз, карт АТЭС и комплексная организация туров. <strong className="text-cream font-medium">Одобрение без стресса и лишних визитов в консульство.</strong>
                        </p>
                    </div>

                    {/* Metrics / Trust Signals */}
                    <div className="flex gap-8 overflow-hidden">
                        <div className="reveal-text flex flex-col">
                            <span className="text-cream font-data text-xl">99.2%</span>
                            <span className="text-cream/50 font-sans text-xs uppercase tracking-wider">Уровень одобрения</span>
                        </div>
                        <div className="w-px h-10 bg-white/10 reveal-text"></div>
                        <div className="reveal-text flex flex-col">
                            <span className="text-cream font-data text-xl">10+ лет</span>
                            <span className="text-cream/50 font-sans text-xs uppercase tracking-wider">Экспертизы</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
