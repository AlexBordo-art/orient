import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import SpecialistBlock from '../components/SpecialistBlock';
import { ArrowRight, Compass } from 'lucide-react';

const TOUR_DESTINATIONS = [
    { slug: 'china', name: 'Туры в Китай', icon: '🇨🇳', desc: 'Пекин, Шанхай, Харбин, Хайнань — авторские маршруты от знатоков региона', popular: true },
    { slug: 'russia', name: 'Туры по России', icon: '🇷🇺', desc: 'Сахалин, Камчатка, Байкал — лучшее Дальнего Востока и за его пределами' },
    { slug: 'hot-deals', name: 'Горящие туры', icon: '🔥', desc: 'Специальные предложения с вылетом в ближайшие даты. Экономия до 40%', popular: true },
];

const ToursHub: React.FC = () => (
    <div className="min-h-screen bg-t-bg">
        <SEO
            title="Авторские туры — Путешествия"
            description="Индивидуальные туры в Китай, по России и горящие предложения от Ориент Экспресс. Авторские маршруты, проверенные экспертами лично. Экономия до 40%."
            canonical="/tours"
            keywords="туры в Китай, горящие туры, путешествия Дальний Восток, туры из Хабаровска"
        />
        <Breadcrumbs />
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center">
                        <Compass className="text-t-strong" size={24} />
                    </div>
                    <span className="text-t-accent text-sm font-mono tracking-widest uppercase opacity-60">Путешествия</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-t-text mb-6 tracking-tight">
                    Авторские маршруты <br />
                    <span className="text-t-accent italic">по всему миру</span>
                </h1>
                <p className="text-t-muted text-lg max-w-2xl leading-relaxed">
                    Мы не продаём стандартные пакеты. Каждое путешествие — это индивидуальный маршрут,
                    проверенный нашими экспертами лично.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-0">
                {TOUR_DESTINATIONS.map(dest => (
                    <Link
                        key={dest.slug}
                        to={`/tours/${dest.slug}`}
                        className="group relative p-8 rounded-2xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500"
                    >
                        {dest.popular && (
                            <span className="absolute top-4 right-4 text-[10px] font-mono text-t-accent bg-t-strong/10 px-2 py-0.5 rounded-full">
                                популярное
                            </span>
                        )}
                        <div className="text-5xl mb-6">{dest.icon}</div>
                        <h3 className="text-t-text font-semibold text-xl mb-3 group-hover:text-t-strong transition-colors">{dest.name}</h3>
                        <p className="text-t-subtle text-sm leading-relaxed mb-6">{dest.desc}</p>
                        <div className="flex items-center gap-2 text-t-accent text-sm group-hover:text-t-strong transition-colors">
                            <span>Смотреть туры</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
            <SpecialistBlock type="china" />
        </div>
    </div>
);

export default ToursHub;
