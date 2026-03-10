import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { Briefcase, ArrowRight, Plane, Shield, Users, Receipt } from 'lucide-react';

const SERVICES = [
    { slug: 'tickets', name: 'Авиабилеты', icon: <Plane size={24} />, desc: 'Поиск и бронирование лучших рейсов по выгодным ценам. Групповые и индивидуальные.' },
    { slug: 'insurance', name: 'Страхование', icon: <Shield size={24} />, desc: 'Туристическое страхование от надёжных компаний. Покрытие медицинских расходов.' },
    { slug: 'guides', name: 'Гиды и переводчики', icon: <Users size={24} />, desc: 'Профессиональные переводчики и гиды в Китае, Корее и других странах.' },
    { slug: 'tax-free', name: 'Tax Free', icon: <Receipt size={24} />, desc: 'Помощь с оформлением возврата налогов при покупках за рубежом.' },
];

const ServicesHub: React.FC = () => (
    <div className="min-h-screen bg-obsidian">
        <Breadcrumbs />
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-champagne/10 border border-champagne/20 flex items-center justify-center">
                        <Briefcase className="text-champagne" size={24} />
                    </div>
                    <span className="text-champagne/60 text-sm font-mono tracking-widest uppercase">Сервисы</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
                    Всё для вашего <br />
                    <span className="text-champagne italic">путешествия</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                    Полная инфраструктура: от авиабилетов до страхования.
                    Все сервисы в одном месте.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.map(svc => (
                    <Link
                        key={svc.slug}
                        to={`/services/${svc.slug}`}
                        className="group flex items-start gap-5 p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-champagne/20 transition-all duration-500"
                    >
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne">
                            {svc.icon}
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-champagne transition-colors">{svc.name}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-3">{svc.desc}</p>
                            <div className="flex items-center gap-2 text-champagne/60 text-sm group-hover:text-champagne transition-colors">
                                <span>Подробнее</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default ServicesHub;
