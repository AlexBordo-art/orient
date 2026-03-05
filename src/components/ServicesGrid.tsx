import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Plane, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        icon: FileText,
        title: 'Визовый центр и АТЭС',
        desc: 'Оформление деловых и туристических виз. Карты международных деловых поездок АТЭС.'
    },
    {
        icon: Plane,
        title: 'Авиа и Ж/Д билеты',
        desc: 'Подбор сложных маршрутов и бронирование билетов по лучшим тарифам.'
    },
    {
        icon: ShieldCheck,
        title: 'Страхование',
        desc: 'Надежные страховые полисы для туристов на любые случаи и срок пребывания.'
    },
    {
        icon: GraduationCap,
        title: 'Обучение за рубежом',
        desc: 'Языковые школы и программы обучения для студентов, детей и взрослых.'
    }
];

const ServicesGrid: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
            <div ref={headerRef} className="text-center mb-16 flex flex-col items-center">
                <h3 className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 font-data">
                    Экосистема услуг
                </h3>
                <h2 className="text-cream text-4xl md:text-5xl font-drama italic max-w-2xl text-center">
                    Комплексная поддержка в Азии
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.map((service, i) => {
                    const Icon = service.icon;
                    return (
                        <div
                            key={i}
                            ref={el => { cardsRef.current[i] = el; }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl group hover:bg-white/10 hover:border-accent/30 transition-all duration-500 cursor-pointer flex flex-col sm:flex-row gap-8 items-start relative overflow-hidden"
                        >
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />

                            <div className="bg-primary/50 p-4 rounded-2xl border border-white/5 shrink-0">
                                <Icon className="w-8 h-8 text-accent" />
                            </div>

                            <div className="flex-1 relative z-10">
                                <h4 className="text-2xl font-heading font-medium text-cream mb-3 tracking-tight">
                                    {service.title}
                                </h4>
                                <p className="text-cream/60 font-body text-sm leading-relaxed mb-6">
                                    {service.desc}
                                </p>

                                <div className="flex items-center gap-2 text-accent text-sm font-bold font-data uppercase tracking-widest translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    Узнать больше
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesGrid;
