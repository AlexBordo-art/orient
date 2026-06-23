import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import SpecialistBlock from '../components/SpecialistBlock';
import { ArrowRight, Compass } from 'lucide-react';

type Destination = {
    slug: string; name: string; code: string; desc: string;
    status: 'live' | 'soon'; popular?: boolean;
};

// Doors derive from what actually has content (TOURS_DATA): China + Japan are live;
// Russia is honestly marked "скоро" (its page still captures leads). Hot-deals stays
// out of the hub until real deals exist — an empty card promising "−40%" lies to the user.
const TOUR_DESTINATIONS: Destination[] = [
    { slug: 'china', name: 'Туры в Китай', code: 'CN', desc: 'Сиань, Чжанцзяцзе, Фэнхуан, Пекин — авторские VIP-маршруты по местам силы Поднебесной', status: 'live', popular: true },
    { slug: 'japan', name: 'Туры в Японию', code: 'JP', desc: 'Токио, Хаконэ, Такаяма, Киото — знакомство со страной традиций и футуризма', status: 'live' },
    { slug: 'russia', name: 'Туры по России', code: 'RU', desc: 'Камчатка, Сахалин, Байкал — экспедиции по Дальнему Востоку. Готовим к запуску', status: 'soon' },
];

const ToursHub: React.FC = () => (
    <div className="min-h-screen bg-transparent">
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
                    <span className="text-t-accent italic">по Азии и Дальнему Востоку</span>
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
                        {dest.status === 'soon' ? (
                            <span className="absolute top-4 right-4 text-[10px] font-mono text-t-subtle bg-t-text/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                скоро
                            </span>
                        ) : dest.popular ? (
                            <span className="absolute top-4 right-4 text-[10px] font-mono text-t-accent bg-t-strong/10 px-2 py-0.5 rounded-full">
                                популярное
                            </span>
                        ) : null}
                        <div className="inline-flex items-center justify-center w-12 h-7 rounded bg-t-strong/10 border border-t-strong/20 mb-6">
                            <span className="font-mono text-[11px] font-bold text-t-strong tracking-widest">{dest.code}</span>
                        </div>
                        <h3 className="text-t-text font-semibold text-xl mb-3 group-hover:text-t-strong transition-colors">{dest.name}</h3>
                        <p className="text-t-subtle text-sm leading-relaxed mb-6">{dest.desc}</p>
                        <div className="flex items-center gap-2 text-t-accent text-sm group-hover:text-t-strong transition-colors">
                            <span>{dest.status === 'soon' ? 'Узнать о запуске' : 'Смотреть туры'}</span>
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
