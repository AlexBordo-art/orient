import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, FileText, Fingerprint, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
    {
        id: '01',
        title: 'Первичная разведка',
        desc: 'Передайте базовые координаты. Наша система мгновенно анализирует протоколы точки назначения и преимущества вашего гражданства.',
        icon: Compass,
        color: 'text-sky-400'
    },
    {
        id: '02',
        title: 'Синтез документов',
        desc: 'Загрузите необходимые артефакты. Мы форматируем и приводим их в точное соответствие с консульскими спецификациями.',
        icon: FileText,
        color: 'text-amber-400'
    },
    {
        id: '03',
        title: 'Биометрия',
        desc: 'При необходимости, мы организуем бесшовную процедуру физической верификации в ближайшем консульском аванпосте.',
        icon: Fingerprint,
        color: 'text-emerald-400'
    },
    {
        id: '04',
        title: 'Доступ разрешен',
        desc: 'Ваш паспорт возвращен с авторизованным допуском. Вы готовы к безопасному пересечению границы.',
        icon: Plane,
        color: 'text-accent'
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
            // It's the total width of the container minus the viewport width
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
                    { opacity: 0.2, scale: 0.9, y: 50 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: tween,
                            start: "left 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen bg-transparent overflow-hidden pt-20">
            {/* Sticky Header inside the pinned section */}
            <div className="absolute top-12 md:top-32 left-8 md:left-24 z-20">
                <h3 className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 font-data">
                    Архитектура въезда
                </h3>
                <h2 className="text-5xl md:text-7xl font-drama italic text-cream leading-tight">
                    Как это работает.
                </h2>
            </div>

            {/* Horizontal Scroll Track */}
            <div ref={scrollRef} className="relative z-10 h-full flex items-center pl-[10vw] pr-[30vw] gap-12 md:gap-24 w-max pt-20">

                {STAGES.map((stage, index) => (
                    <div
                        key={stage.id}
                        className="journey-card relative flex flex-col justify-end w-[85vw] md:w-[500px] h-[50dvh] md:h-[600px] rounded-[3rem] p-10 group shrink-0"
                    >
                        {/* Glassmorphic Background that reacts to hover */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20" />

                        {/* Connecting Line (except last) */}
                        {index !== STAGES.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-24 w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent z-0" />
                        )}

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <span className="font-data text-5xl md:text-7xl font-light text-white/10">
                                    {stage.id}
                                </span>
                                <div className={`w-14 h-14 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/5 ${stage.color}`}>
                                    <stage.icon className="w-6 h-6" />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-heading font-medium text-3xl md:text-4xl text-cream mb-4 tracking-tight">
                                    {stage.title}
                                </h3>
                                <p className="text-cream/60 font-body text-lg leading-relaxed max-w-sm">
                                    {stage.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
                <span className="text-white/50 text-xs font-data uppercase tracking-widest">Скролл для продолжения</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    );
};

export default HorizontalJourney;
