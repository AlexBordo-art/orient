import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const DESTINATIONS = [
    {
        id: 'china',
        title: 'Китай',
        type: 'Туризм / Бизнес',
        time: 'От 3 до 5 дней',
        features: ['Мультивизы на год', 'Подача без присутствия', 'Специальные условия для ДВ'],
        flag: '🇨🇳'
    },
    {
        id: 'korea',
        title: 'Южная Корея',
        type: 'K-ETA',
        time: 'От 2 до 5 дней',
        features: ['Электронное разрешение', 'Заполнение на англ. языке', 'Гарантия правильности данных'],
        flag: '🇰🇷'
    },
    {
        id: 'thailand',
        title: 'Таиланд',
        type: 'Туристическая виза',
        time: 'От 7 дней',
        features: ['Долгосрочное пребывание', 'TR, STV визы', 'Сбор пакета документов'],
        flag: '🇹🇭'
    },
    {
        id: 'india',
        title: 'Индия',
        type: 'E-Visa',
        time: 'От 3 дней',
        features: ['Электронная подача', 'Мультивиза', 'Без посещения консульства'],
        flag: '🇮🇳'
    },
    {
        id: 'schengen',
        title: 'Шенген (Болгария)',
        type: 'Единая виза',
        time: 'От 15 дней',
        features: ['Лёгкий вход в Шенген', 'Полноценная биометрия', 'Доступ по всей зоне'],
        flag: '🇪🇺'
    },
    {
        id: 'singapore',
        title: 'Сингапур',
        type: 'Электронная',
        time: 'От 3 дней',
        features: ['Только онлайн подача', 'Срок до 30 дней', 'Высокий шанс одобрения'],
        flag: '🇸🇬'
    }
];

const Destinations: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gridRef.current?.children;
        if (!cards) return;

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section id="destinations" className="section bg-white" ref={sectionRef}>
            <div className="container-main">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-body font-bold text-primary tracking-widest uppercase mb-4">Направления</h2>
                        <h3 className="text-title text-sky-900 font-heading">
                            Открываем мир.<br />
                            <span className="italic text-primary">Быстро и легально.</span>
                        </h3>
                    </div>
                    <div>
                        <p className="text-sky-800/70 font-light flex items-center gap-2">
                            <Globe2 className="w-5 h-5 text-cta" />
                            Более 20 стран для оформления
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
                    {DESTINATIONS.map((dest) => (
                        <div key={dest.id} className="card group flex flex-col relative overflow-hidden">
                            {/* Flag & Title */}
                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div>
                                    <div className="text-4xl mb-4 shadow-sm inline-block rounded-full bg-sky-50 p-2">{dest.flag}</div>
                                    <h4 className="text-2xl font-heading text-sky-900 mb-1">{dest.title}</h4>
                                    <p className="text-sm text-sky-600 font-body uppercase tracking-wider">{dest.type}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full whitespace-nowrap">
                                        {dest.time}
                                    </span>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-grow relative z-10">
                                {dest.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sky-800/80 font-light text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Action */}
                            <div className="mt-auto relative z-10 pt-4 border-t border-sky-100">
                                <Magnetic strength={10}>
                                    <button className="flex items-center text-primary font-medium hover:text-cta transition-colors group/btn">
                                        Оформить визу
                                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </Magnetic>
                            </div>

                            {/* Hover accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
