import React, { useRef, useState } from 'react';
import { Globe2, Compass, BookOpen, PlaneTakeoff, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PORTAL_SECTIONS = [
    {
        id: '01',
        title: 'Визовый Центр',
        desc: 'Оформление туристических, деловых и учебных виз. Индивидуальные стратегии для сложных кейсов.',
        icon: <Globe2 className="w-8 h-8 text-t-strong" strokeWidth={1.5} />,
        linkText: 'Подробнее',
        href: '/visas',
        accent: 'from-champagne/20 to-champagne/5',
    },
    {
        id: '02',
        title: 'Туры в Китай',
        desc: 'От высокотехнологичного Шэньчжэня до древних терракотовых армий с премиальным сопровождением.',
        icon: <Compass className="w-8 h-8 text-t-strong-light" strokeWidth={1.5} />,
        linkText: 'Направления',
        href: '/tours',
        accent: 'from-amber-500/20 to-amber-500/5',
    },
    {
        id: '03',
        title: 'Образование',
        desc: 'Языковые школы, колледжи и университеты по всему миру. Полное сопровождение зачисления.',
        icon: <BookOpen className="w-8 h-8 text-blue-400" strokeWidth={1.5} />,
        linkText: 'Программы',
        href: '/education',
        accent: 'from-blue-500/20 to-blue-500/5',
    },
    {
        id: '04',
        title: 'Авиабилеты',
        desc: 'Доступ к закрытым тарифам и сложным стыковкам. Круглосуточная консьерж-поддержка.',
        icon: <PlaneTakeoff className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />,
        linkText: 'Заказать',
        href: '/services',
        accent: 'from-emerald-500/20 to-emerald-500/5',
    },
    {
        id: '05',
        title: 'Страхование',
        desc: 'Расширенные полисы для активного отдыха, медицины и страхования от невыезда.',
        icon: <ShieldCheck className="w-8 h-8 text-violet-400" strokeWidth={1.5} />,
        linkText: 'Выбрать',
        href: '/services',
        accent: 'from-violet-500/20 to-violet-500/5',
    }
];

const PortalCarousel: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 10);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.querySelector('.portal-card')?.clientWidth || 380;
        const gap = 24;
        const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setTimeout(updateScrollState, 400);
    };

    return (
        <section id="portal" className="py-20 md:py-28 relative bg-t-bg/80 backdrop-blur-sm z-20 border-t border-t-border">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-sapphire-dark/15 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-champagne-dark/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">

                {/* Section Header */}
                <div className="container-main flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
                    <div>
                        <h2 className="text-t-strong text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 font-mono">
                            Наши направления
                        </h2>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium text-t-text tracking-tight">
                            Выберите услугу
                        </h3>
                    </div>
                    {/* Navigation Arrows — desktop */}
                    <div className="hidden sm:flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`w-12 h-12 rounded-full border border-t-border flex items-center justify-center transition-all duration-300 ${canScrollLeft
                                ? 'hover:bg-champagne/10 hover:border-champagne/40 text-t-muted hover:text-t-strong cursor-pointer'
                                : 'text-white/10 cursor-not-allowed'
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`w-12 h-12 rounded-full border border-t-border flex items-center justify-center transition-all duration-300 ${canScrollRight
                                ? 'hover:bg-champagne/10 hover:border-champagne/40 text-t-muted hover:text-t-strong cursor-pointer'
                                : 'text-white/10 cursor-not-allowed'
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <div
                    ref={scrollRef}
                    onScroll={updateScrollState}
                    className="flex gap-6 overflow-x-auto scrollbar-hide pl-[max(1rem,calc((100vw-80rem)/2+1rem))] pr-8 pb-4 snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {PORTAL_SECTIONS.map((section) => (
                        <Link
                            key={section.id}
                            to={section.href}
                            className="portal-card group relative flex-shrink-0 w-[85vw] sm:w-[380px] lg:w-[420px] rounded-3xl border border-t-border bg-t-card backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between cursor-pointer snap-start transition-all duration-500 hover:border-champagne/20 hover:bg-t-elevated min-h-[340px] sm:min-h-[380px]"
                        >
                            {/* Hover glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${section.accent} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                            {/* Top: Icon + Number */}
                            <div className="flex justify-between items-start relative z-10 mb-auto">
                                <div className="w-14 h-14 rounded-2xl bg-obsidian-light/50 border border-t-border shadow-inner flex items-center justify-center backdrop-blur-md">
                                    {section.icon}
                                </div>
                                <span className="font-mono text-5xl font-bold text-t-text/[0.04] group-hover:text-t-text/[0.08] transition-colors duration-500">
                                    {section.id}
                                </span>
                            </div>

                            {/* Bottom: Content */}
                            <div className="relative z-10 mt-8">
                                <h4 className="text-2xl sm:text-3xl font-heading font-medium text-t-text mb-3 tracking-tight">
                                    {section.title}
                                </h4>
                                <p className="text-t-muted font-sans font-light text-sm sm:text-base leading-relaxed mb-6">
                                    {section.desc}
                                </p>

                                <div className="inline-flex items-center gap-3 text-t-muted group-hover:text-t-strong transition-colors duration-300">
                                    <div className="w-10 h-10 rounded-full border border-t-border group-hover:border-champagne/40 group-hover:bg-champagne/10 flex items-center justify-center transition-all duration-500">
                                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                    </div>
                                    <span className="font-mono text-xs uppercase tracking-[0.15em] font-bold">
                                        {section.linkText}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile scroll indicator */}
                <div className="sm:hidden flex justify-center mt-6 gap-1.5">
                    {PORTAL_SECTIONS.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortalCarousel;
