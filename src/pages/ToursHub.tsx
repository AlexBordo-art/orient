import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { ArrowRight, Compass } from 'lucide-react';

const TOUR_DESTINATIONS = [
    { slug: 'china', name: 'Туры в Китай', icon: '🇨🇳', desc: 'Пекин, Шанхай, Харбин, Хайнань — авторские маршруты от знатоков региона', popular: true },
    { slug: 'russia', name: 'Туры по России', icon: '🇷🇺', desc: 'Сахалин, Камчатка, Байкал — лучшее Дальнего Востока и за его пределами' },
    { slug: 'hot-deals', name: 'Горящие туры', icon: '🔥', desc: 'Специальные предложения с вылетом в ближайшие даты. Экономия до 40%', popular: true },
];

const ToursHub: React.FC = () => (
    <div className="min-h-screen bg-obsidian">
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
                    <div className="w-12 h-12 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center">
                        <Compass className="text-champagne" size={24} />
                    </div>
                    <span className="text-champagne/60 text-sm font-mono tracking-widest uppercase">Путешествия</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
                    Авторские маршруты <br />
                    <span className="text-champagne italic">по всему миру</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                    Мы не продаём стандартные пакеты. Каждое путешествие — это индивидуальный маршрут,
                    проверенный нашими экспертами лично.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TOUR_DESTINATIONS.map(dest => (
                    <Link
                        key={dest.slug}
                        to={`/tours/${dest.slug}`}
                        className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-champagne/20 transition-all duration-500"
                    >
                        {dest.popular && (
                            <span className="absolute top-4 right-4 text-[10px] font-mono text-champagne/60 bg-champagne/10 px-2 py-0.5 rounded-full">
                                популярное
                            </span>
                        )}
                        <div className="text-5xl mb-6">{dest.icon}</div>
                        <h3 className="text-white font-semibold text-xl mb-3 group-hover:text-champagne transition-colors">{dest.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{dest.desc}</p>
                        <div className="flex items-center gap-2 text-champagne/60 text-sm group-hover:text-champagne transition-colors">
                            <span>Смотреть туры</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default ToursHub;
