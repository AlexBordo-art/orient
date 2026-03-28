import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { Briefcase, ArrowRight, Plane, Shield, Users, Receipt } from 'lucide-react';

const SERVICES = [
    { slug: 'tickets', name: 'Авиабилеты', icon: <Plane size={24} />, desc: 'Поиск и бронирование лучших рейсов по выгодным ценам. Групповые и индивидуальные.' },
    { slug: 'insurance', name: 'Страхование', icon: <Shield size={24} />, desc: 'Туристическое страхование от надёжных компаний. Покрытие медицинских расходов.' },
    { slug: 'guides', name: 'Гиды и переводчики', icon: <Users size={24} />, desc: 'Профессиональные переводчики и гиды в Китае, Корее и других странах.' },
    { slug: 'tax-free', name: 'Tax Free', icon: <Receipt size={24} />, desc: 'Помощь с оформлением возврата налогов при покупках за рубежом.' },
];

const ServicesHub: React.FC = () => (
    <div className="min-h-screen bg-transparent">
        <SEO
            title="Авиабилеты, Страхование, Гиды"
            description="Полный комплекс туристических сервисов: авиабилеты, страхование путешествий, гиды и переводчики, Tax Free. Всё от Ориент Экспресс."
            canonical="/services"
            keywords="авиабилеты, страхование путешествий, гиды в Китае, tax free"
        />
        <Breadcrumbs />
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center">
                        <Briefcase className="text-t-strong" size={24} />
                    </div>
                    <span className="text-t-accent text-sm font-mono tracking-widest uppercase opacity-60">Сервисы</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-t-text mb-6 tracking-tight">
                    Всё для вашего <br />
                    <span className="text-t-accent italic">путешествия</span>
                </h1>
                <p className="text-t-muted text-lg max-w-2xl leading-relaxed">
                    Полная инфраструктура: от авиабилетов до страхования.
                    Все сервисы в одном месте.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.map(svc => (
                    <Link
                        key={svc.slug}
                        to={`/services/${svc.slug}`}
                        className="group flex items-start gap-5 p-8 rounded-2xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500"
                    >
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center text-t-strong">
                            {svc.icon}
                        </div>
                        <div>
                            <h3 className="text-t-text font-semibold text-lg mb-2 group-hover:text-t-strong transition-colors">{svc.name}</h3>
                            <p className="text-t-subtle text-sm leading-relaxed mb-3">{svc.desc}</p>
                            <div className="flex items-center gap-2 text-t-accent opacity-60 text-sm group-hover:text-t-strong group-hover:opacity-100 transition-colors">
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
