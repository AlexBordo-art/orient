import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Plane, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';
import KineticTitle from './KineticTitle';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        icon: FileText,
        title: 'Оформление Визовых Протоколов & АТЭС',
        desc: 'Мы берем на себя всю бюрократию. От детального планирования сложного профиля до выдачи готового паспорта с многократной визой. Включает специализированные карты международных деловых поездок.',
        colSpan: 'md:col-span-2 md:row-span-2',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200'
    },
    {
        icon: Plane,
        title: 'Приватная Логистика',
        desc: 'Организация сложных маршрутов, бизнес-авиация и бронирование премиальных тарифов.',
        colSpan: 'md:col-span-1',
    },
    {
        icon: ShieldCheck,
        title: 'Ультимативная Страховка',
        desc: 'Глобальное медицинское покрытие.',
        colSpan: 'md:col-span-1',
    },
    {
        icon: GraduationCap,
        title: 'Академическая Интеграция',
        desc: 'Подбор закрытых школ и университетов за границей для вашей семьи.',
        colSpan: 'md:col-span-2',
    }
];

const ServicesGrid: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%"
                    }
                }
            );

            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 100, z: -150, rotateX: -20, rotateY: 15, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "back.out(1.2, 0.8)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="section-padding relative z-10">
            <div className="container-main">
                <div ref={headerRef} className="text-center mb-16 lg:mb-24 flex flex-col items-center">
                    <h3 ref={headerRef} className="text-t-strong text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 font-mono">
                        Инфраструктура Услуг
                    </h3>
                    <KineticTitle
                        text="Экосистема для людей, которые ценят свое время"
                        tag="h2"
                        className="text-t-text text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight max-w-3xl text-center"
                    />
                </div>

                {/* Bento Grid layout with perspective for 3D entrance */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]" style={{ perspective: '1200px' }}>
                    {SERVICES.map((service, i) => {
                        const Icon = service.icon;
                        const isLarge = service.colSpan.includes('row-span-2');

                        return (
                            <div
                                key={i}
                                ref={el => { cardsRef.current[i] = el; }}
                                className={`glass-card group p-8 lg:p-10 flex flex-col justify-between relative ${service.colSpan}`}
                            >
                                {/* Background Image for large card */}
                                {service.image && (
                                    <div className="absolute inset-0 w-full h-full opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-700 pointer-events-none z-0">
                                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-dark via-obsidian/50 to-transparent z-10" />
                                        <img src={service.image} alt="" className="w-full h-full object-cover object-center" />
                                    </div>
                                )}

                                {/* Corner Accent Glow */}
                                <div className="absolute -top-12 -right-12 w-48 h-48 bg-sapphire/20 rounded-full blur-[50px] group-hover:bg-champagne/10 transition-colors duration-700 z-0" />

                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="bg-t-card w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                                        <Icon className="w-7 h-7 text-t-strong-light" strokeWidth={1.5} />
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                        <ArrowRight className="w-5 h-5 text-t-strong" />
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto pt-8">
                                    <h4 className={`font-heading font-medium text-t-text tracking-tight leading-tight mb-3 ${isLarge ? 'text-4xl pr-12' : 'text-2xl'}`}>
                                        {service.title}
                                    </h4>
                                    <p className={`text-t-muted font-sans font-light leading-relaxed max-w-xl ${isLarge ? 'text-lg' : 'text-base line-clamp-2'}`}>
                                        {service.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
