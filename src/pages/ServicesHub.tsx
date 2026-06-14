import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/services';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { Briefcase, ArrowRight, Shield, Plane, Hotel } from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
    insurance: <Shield size={24} />,
    tickets: <Plane size={24} />,
    hotels: <Hotel size={24} />
};

const ServicesHub: React.FC = () => (
    <div className="min-h-screen bg-transparent">
        <SEO
            title="Сопутствующие услуги — Страхование, авиабилеты, отели"
            description="Полный комплекс туристических сервисов: оформление медицинских страховок для виз, бронирование отелей за рубежом с оплатой в рублях, покупка авиабилетов от Ориент Экспресс."
            canonical="/services"
            keywords="авиабилеты, страхование путешествий, бронирование отелей за рубежом, отели в Китае"
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
                    Инфраструктура <br />
                    <span className="text-t-accent italic">вашего комфорта</span>
                </h1>
                <p className="text-t-muted text-lg max-w-2xl leading-relaxed">
                    Мы берем на себя все сопутствующие задачи по подготовке к путешествию: от выписки легитимных броней авиабилетов до оформления надежной страховки и оплаты зарубежных отелей.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SERVICES_DATA.map(svc => (
                    <Link
                        key={svc.id}
                        to={`/services/${svc.id}`}
                        className="group flex flex-col justify-between p-8 rounded-2xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500 shadow-xl"
                    >
                        <div>
                            <div className="shrink-0 w-12 h-12 rounded-xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center text-t-strong mb-6">
                                {SERVICE_ICONS[svc.id] || <Briefcase size={24} />}
                            </div>
                            <h3 className="text-t-text font-heading font-medium text-xl mb-3 group-hover:text-t-strong transition-colors">{svc.title}</h3>
                            <p className="text-t-subtle text-xs font-sans font-light leading-relaxed mb-6">{svc.subtitle}</p>
                            <span className="inline-block text-[10px] font-mono text-t-strong bg-t-strong/10 border border-t-strong/20 px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                                {svc.price}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-t-accent text-xs font-mono tracking-widest uppercase border-t border-t-border/50 pt-4 group-hover:text-t-strong transition-colors">
                            <span>Подробнее</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default ServicesHub;
