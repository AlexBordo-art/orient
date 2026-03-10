import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, FileText, Fingerprint, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
    {
        id: '01',
        title: 'Первичный аудит',
        desc: 'Передайте базовые вводные. Наша система мгновенно анализирует протоколы точки назначения и оценивает перспективы.',
        icon: Compass,
        color: 'text-champagne border-champagne/30'
    },
    {
        id: '02',
        title: 'Синтез документов',
        desc: 'Мы форматируем пакет документов и приводим их в точное соответствие с актуальными консульскими спецификациями.',
        icon: FileText,
        color: 'text-champagne-light border-champagne-light/30'
    },
    {
        id: '03',
        title: 'Биометрия',
        desc: 'При необходимости, мы организуем бесшовную процедуру физической верификации в консульском аванпосте или визовом центре.',
        icon: Fingerprint,
        color: 'text-sapphire-light border-sapphire-light/30'
    },
    {
        id: '04',
        title: 'Доступ разрешен',
        desc: 'Ваш паспорт возвращен с авторизованным допуском. Вы готовы к безопасному пересечению границы.',
        icon: Plane,
        color: 'text-white border-white/30'
    }
];

const HorizontalJourney: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const scrollContainer = scrollRef.current;
            if (!scrollContainer) return;

            // Calculate how far we need to scroll horizontally
            const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

            const tween = gsap.to(scrollContainer, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${getScrollAmount() * -1}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Fade in cards as they come into view
            gsap.utils.toArray('.journey-card').forEach((card: any) => {
                gsap.fromTo(card,
                    { opacity: 0.1, scale: 0.95, y: 20 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: tween,
                            start: "left 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen bg-transparent overflow-hidden pt-20 z-10 border-y border-white/5">
            {/* Sticky Header inside the pinned section */}
            <div className="absolute top-12 md:top-32 left-8 md:left-24 z-20 mix-blend-difference pointer-events-none">
                <h3 className="text-champagne text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 font-mono">
                    Архитектура въезда
                </h3>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight text-white leading-tight">
                    Процессинг.
                </h2>
            </div>

            {/* Horizontal Scroll Track */}
            <div ref={scrollRef} className="relative z-10 h-full flex items-center pl-[10vw] pr-[30vw] gap-12 md:gap-24 w-max pt-20">

                {STAGES.map((stage, index) => (
                    <div
                        key={stage.id}
                        className="journey-card relative flex flex-col justify-end w-[85vw] md:w-[500px] h-[55dvh] md:h-[600px] rounded-[2rem] p-10 group shrink-0"
                    >
                        {/* Glassmorphic Background that reacts to hover */}
                        <div className="absolute inset-0 bg-obsidian-dark/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] transition-all duration-700 group-hover:bg-sapphire/10 group-hover:border-champagne/20" />

                        {/* Connecting Line (except last) */}
                        {index !== STAGES.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-24 w-24 h-[1px] bg-gradient-to-r from-champagne/30 to-transparent z-0" />
                        )}

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <span className="font-mono text-5xl md:text-7xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                                    {stage.id}
                                </span>
                                <div className={`w-14 h-14 rounded-full bg-obsidian backdrop-blur-md flex items-center justify-center border font-semibold ${stage.color}`}>
                                    <stage.icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-heading font-medium text-3xl md:text-4xl text-slate-100 mb-4 tracking-tight">
                                    {stage.title}
                                </h3>
                                <p className="text-slate-300 font-sans font-light text-lg leading-relaxed max-w-sm">
                                    {stage.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
                <span className="text-slate-300 text-[10px] font-mono uppercase tracking-[0.3em]">Скролл для продолжения</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-champagne/50 to-transparent" />
            </div>
        </section>
    );
};

export default HorizontalJourney;
