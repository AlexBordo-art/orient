import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TOURS_DATA } from '../data/tours';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import SpecialistBlock from '../components/SpecialistBlock';
import { ArrowRight, Calendar, Compass, MapPin } from 'lucide-react';

const CATEGORY_NAMES: Record<string, { title: string; desc: string }> = {
    'china': {
        title: 'Маршруты по Китаю',
        desc: 'От древних памятников Сианя до парящих гор Чжанцзяцзе и футуристического Шанхая. Погружение в культуру знатоков региона.'
    },
    'japan': {
        title: 'Путешествия в Японию',
        desc: 'Сверхскоростные поезда, самурайские замки, цветение сакуры и скрытые жемчужины японских Альп в эксклюзивных VIP-турах.'
    },
    'russia': {
        title: 'Туры по России',
        desc: 'Уникальные экспедиции по Камчатке, Сахалину и Байкалу. Первозданная природа Дальнего Востока с премиальным комфортом.'
    },
    'hot-deals': {
        title: 'Горящие туры',
        desc: 'Готовые предложения по специальным тарифам с вылетом в ближайшие даты. Ограниченное количество мест.'
    }
};

const ToursCategory: React.FC = () => {
    const { destination } = useParams<{ destination: string }>();
    const navigate = useNavigate();

    const category = destination || 'china';
    const tours = TOURS_DATA.filter(t => t.category === category);
    const info = CATEGORY_NAMES[category] || { title: 'Путешествия', desc: 'Авторские маршруты от Orient Express.' };

    return (
        <div className="min-h-screen bg-transparent">
            <SEO
                title={`${info.title} — Авторские туры`}
                description={info.desc}
                canonical={`/tours/${category}`}
            />
            <Breadcrumbs />

            <div className="max-w-7xl mx-auto px-6 pb-20">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate('/tours')}
                        className="text-t-accent hover:text-t-strong font-mono text-xs uppercase tracking-wider mb-6 flex items-center gap-1.5 transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Назад к направлениям
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center">
                            <Compass className="text-t-strong" size={20} />
                        </div>
                        <span className="text-t-accent text-xs font-mono tracking-widest uppercase opacity-60">Направление</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-t-text mb-4 tracking-tight leading-tight">
                        {info.title}
                    </h1>
                    <p className="text-t-muted text-base max-w-2xl leading-relaxed">
                        {info.desc}
                    </p>
                </div>

                {/* Tours Grid */}
                {tours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {tours.map(tour => (
                            <div
                                key={tour.id}
                                className="group relative flex flex-col justify-between rounded-2xl border border-t-border bg-t-card overflow-hidden hover:border-t-strong/30 transition-all duration-500 shadow-xl"
                            >
                                {/* Photo Container */}
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/30 to-transparent pointer-events-none" />
                                    <span className="absolute bottom-4 right-4 text-[10px] font-mono text-t-strong bg-t-bg/90 border border-t-strong/20 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                                        {tour.price || 'Цена по запросу'}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                                    <div>
                                        {(tour.duration || tour.dates) && (
                                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                {tour.duration && (
                                                    <div className="flex items-center gap-1 text-[10px] font-mono text-t-strong uppercase tracking-wider">
                                                        <Calendar size={12} />
                                                        <span>{tour.duration}</span>
                                                    </div>
                                                )}
                                                {tour.duration && tour.dates && <span className="w-1 h-1 rounded-full bg-t-text/20"></span>}
                                                {tour.dates && <span className="text-[10px] font-mono text-t-accent uppercase tracking-wider">{tour.dates}</span>}
                                            </div>
                                        )}

                                        <h3 className="text-t-text font-heading font-medium text-2xl lg:text-3xl mb-3 tracking-tight group-hover:text-t-strong transition-colors">
                                            {tour.title}
                                        </h3>
                                        <p className="text-t-muted text-sm italic font-light mb-4">{tour.subtitle}</p>

                                        <div className="flex gap-1.5 items-start text-xs text-t-subtle mb-6">
                                            <MapPin size={14} className="shrink-0 text-t-strong/60 mt-0.5" />
                                            <span>{tour.route}</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/tours/${category}/${tour.id}`}
                                        className="btn-card btn-card-primary justify-center py-3.5 rounded-lg flex items-center gap-2 w-full"
                                    >
                                        <span>Подробнее о туре</span>
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-t-border rounded-2xl bg-t-card/25 backdrop-blur-sm mb-16">
                        <Compass className="mx-auto text-t-accent/40 mb-4 animate-spin-slow" size={48} />
                        <h3 className="text-xl font-heading text-t-text mb-2">Направление готовится к запуску</h3>
                        <p className="text-t-muted text-sm max-w-md mx-auto">
                            Наши эксперты детально прорабатывают новые маршруты в этом регионе. Оставьте заявку, и мы сообщим вам о запуске первыми.
                        </p>
                        <button
                            onClick={() => navigate('/tours')}
                            className="mt-6 btn-premium !py-3 !px-8 text-xs font-mono tracking-widest uppercase"
                        >
                            Все направления
                        </button>
                    </div>
                )}

                <SpecialistBlock type="china" />
            </div>
        </div>
    );
};

export default ToursCategory;
