import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe2, Compass, BookOpen, PlaneTakeoff, ShieldCheck, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const PORTAL_SECTIONS = [
    {
        id: '01',
        title: 'Визовый Центр',
        desc: 'Эталонный процессинг туристических, деловых и учебных виз. Индивидуальные стратегии для сложных кейсов и безупречная логистика документов.',
        icon: <Globe2 className="w-10 h-10 text-champagne" strokeWidth={1} />,
        linkText: 'Открыть Визовый Центр',
        href: '/visas'
    },
    {
        id: '02',
        title: 'Туры в Китай',
        desc: 'Погружение в Поднебесную нового уровня. От высокотехнологичного Шэньчжэня до древних терракотовых армий с премиальным сопровождением.',
        icon: <Compass className="w-10 h-10 text-champagne-light" strokeWidth={1} />,
        linkText: 'Смотреть Направления',
        href: '/china'
    },
    {
        id: '03',
        title: 'Образование за Рубежом',
        desc: 'Инвестиции в будущее. Мы подберем лучшие языковые школы, колледжи и университеты по всему миру, взяв на себя весь процесс зачисления.',
        icon: <BookOpen className="w-10 h-10 text-sapphire-light" strokeWidth={1} />,
        linkText: 'Изучить Программы',
        href: '/education'
    },
    {
        id: '04',
        title: 'Авиабилеты & ИЖД',
        desc: 'Доступ к закрытым тарифам и сложным стыковкам. Организация перелетов любой сложности с круглосуточной консьерж-поддержкой.',
        icon: <PlaneTakeoff className="w-10 h-10 text-white" strokeWidth={1} />,
        linkText: 'Заказать Билеты',
        href: '/tickets'
    },
    {
        id: '05',
        title: 'Страхование Путешествий',
        desc: 'Ваша абсолютная безопасность в любой точке мира. Расширенные полисы для активного отдыха, медицины и страхования от невыезда.',
        icon: <ShieldCheck className="w-10 h-10 text-slate-300" strokeWidth={1} />,
        linkText: 'Выбрать Полис',
        href: '/insurance'
    }
];

const PortalCarousel: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.portal-card') as HTMLElement[];

        // Sticky Stacking & Blurring Animation
        cards.forEach((card, index) => {
            if (index === cards.length - 1) return; // Last card doesn't scale down

            gsap.to(card, {
                scale: 0.85,
                opacity: 0.3,
                filter: 'blur(16px)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 15%', // When card hits top of viewport
                    endTrigger: cards[index + 1],
                    end: 'top 40%', // Until next card takes over
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section id="portal" className="py-24 md:py-32 relative bg-obsidian-dark z-20 border-t border-white/5" ref={sectionRef}>

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-sapphire-dark/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-champagne-dark/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container-main relative z-10">
                <div className="text-center mb-24 lg:mb-32">
                    <h2 className="text-champagne text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 font-mono">
                        Инфраструктура Опыта
                    </h2>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-slate-100 tracking-tight">
                        Выберите направление
                    </h3>
                </div>

                <div className="space-y-12 md:space-y-24 max-w-5xl mx-auto" ref={containerRef}>
                    {PORTAL_SECTIONS.map((section, index) => (
                        <div
                            key={index}
                            className="portal-card sticky top-20 md:top-32 glass-panel p-10 md:p-20 shadow-2xl origin-top flex flex-col justify-between group h-[60vh] md:h-[65vh] min-h-[450px]"
                        >
                            {/* Inner Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-champagne/0 to-sapphire/0 group-hover:from-champagne/5 group-hover:to-sapphire/5 rounded-3xl transition-all duration-700 pointer-events-none" />

                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-obsidian-light/50 border border-white/10 shadow-inner flex items-center justify-center backdrop-blur-md">
                                    {section.icon}
                                </div>
                                <span className="font-mono text-5xl md:text-8xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                                    {section.id}
                                </span>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <h4 className="text-4xl md:text-6xl font-heading font-medium text-slate-100 mb-6 tracking-tight">
                                    {section.title}
                                </h4>
                                <p className="text-slate-300 font-sans font-light text-lg md:text-2xl leading-relaxed max-w-2xl mb-12">
                                    {section.desc}
                                </p>

                                <Magnetic strength={0.3}>
                                    <a
                                        href={section.href}
                                        className="inline-flex items-center justify-center md:justify-start gap-4 text-slate-100 group/btn"
                                    >
                                        <div className="w-14 h-14 rounded-full border border-champagne/30 bg-champagne/10 flex items-center justify-center backdrop-blur-md group-hover/btn:bg-champagne group-hover/btn:border-champagne group-hover/btn:text-obsidian transition-all duration-500">
                                            <ArrowRight className="w-6 h-6 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-500" />
                                        </div>
                                        <span className="font-mono text-sm uppercase tracking-[0.2em] font-bold group-hover/btn:text-champagne transition-colors duration-500">
                                            {section.linkText}
                                        </span>
                                    </a>
                                </Magnetic>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Height spacer to allow the sticky effect to fully play out for the last card before next section (if there is one) */}
            <div className="h-[20vh]"></div>
        </section>
    );
};

export default PortalCarousel;
