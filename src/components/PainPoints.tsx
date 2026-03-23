import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileQuestion, XOctagon, Clock3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PAIN_POINTS = [
    {
        icon: <FileQuestion className="w-8 h-8 text-t-strong-light" strokeWidth={1.5} />,
        title: "Бюрократический лабиринт",
        desc: "Гуглите списки, звоните в визовые центры, но требования постоянно меняются. Страшно принести не ту справку и потерять время.",
        solution: "Формируем предельно точный, актуальный протокол документов под вашу цель поездки."
    },
    {
        icon: <XOctagon className="w-8 h-8 text-rose-400" strokeWidth={1.5} />,
        title: "Риск отказа",
        desc: "Отказ портит визовую историю навсегда. Особенно сейчас, когда консульства присматриваются к каждому штампу.",
        solution: "Наш процент успешных кейсов — 98%. Мы берем на себя ответственность за результат."
    },
    {
        icon: <Clock3 className="w-8 h-8 text-sapphire-light" strokeWidth={1.5} />,
        title: "Потеря времени",
        desc: "Запись в консульство, поездки, часы ожидания в визовом центре — всё это отнимает самый ценный ресурс.",
        solution: "Вам нужен только паспорт. Остальную логистику мы полностью берём на себя."
    }
];

const PainPoints: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = cardsRef.current?.children;
        if (!cards) return;

        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%'
                }
            }
        );

        gsap.fromTo(cards,
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section className="section-padding relative z-10" id="painpoints" ref={sectionRef}>
            <div className="container-main">
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 flex flex-col items-center">
                    <h3 className="text-t-strong text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 font-mono">
                        Проблематика
                    </h3>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-t-text leading-tight mb-6">
                        Оформление визы часто превращается в лотерею.
                    </h2>
                    <p className="text-t-muted font-sans font-light text-lg md:text-xl leading-relaxed">
                        Мы берем на себя все риски и бюрократию, чтобы вы могли сфокусироваться на главном.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" ref={cardsRef}>
                    {PAIN_POINTS.map((item, idx) => (
                        <div key={idx} className="glass-card group p-8 lg:p-10 hover:-translate-y-2 transition-all duration-500 hover:border-champagne/30 relative overflow-hidden flex flex-col">

                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-sapphire/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="w-16 h-16 rounded-2xl bg-t-card border border-t-border shadow-inner flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110">
                                {item.icon}
                            </div>

                            <h3 className="text-2xl font-heading font-medium text-t-text mb-4 tracking-tight relative z-10">{item.title}</h3>
                            <p className="text-t-muted font-sans font-light leading-relaxed mb-8 relative z-10 flex-1">{item.desc}</p>

                            <div className="pt-6 border-t border-t-border mt-auto relative z-10">
                                <p className="font-sans font-medium text-t-text flex gap-3 items-start">
                                    <span className="text-t-strong mt-0.5 w-4 h-4 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0 text-[10px]">✓</span>
                                    <span className="leading-snug">{item.solution}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
