import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES_DATA } from '../data/services';
import { ModalContext } from '../layouts/RootLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { Briefcase, ChevronRight, Clock, Shield } from 'lucide-react';

const ServicePage: React.FC = () => {
    const { service: serviceId } = useParams<{ service: string }>();
    const navigate = useNavigate();
    const { openLeadModal } = useContext(ModalContext);

    const service = SERVICES_DATA.find(s => s.id === serviceId);

    if (!service) {
        return (
            <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-6 text-center">
                <SEO title="Услуга не найдена" description="Запрошенный сервис отсутствует." />
                <Briefcase className="text-t-accent mb-4 animate-spin-slow" size={48} />
                <h1 className="text-2xl font-heading text-t-text mb-2">Услуга не найдена</h1>
                <p className="text-t-muted text-sm max-w-sm mb-6">
                    Услуга временно недоступна или находится на обновлении тарифов.
                </p>
                <button onClick={() => navigate('/services')} className="btn-premium">
                    Назад к услугам
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent">
            <SEO
                title={`${service.title} — Сопутствующие услуги`}
                description={`${service.description.substring(0, 150)}...`}
                canonical={`/services/${service.id}`}
            />
            <Breadcrumbs />

            {/* Hero Section */}
            <div className="relative h-[50vh] md:h-[55vh] w-full overflow-hidden shrink-0">
                <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-dark via-obsidian-dark/40 to-obsidian-dark/30 z-10" />

                <div className="absolute inset-0 z-20 flex items-end">
                    <div className="max-w-7xl mx-auto w-full px-6 pb-12 md:pb-16">
                        <button
                            onClick={() => navigate('/services')}
                            className="text-champagne/80 hover:text-champagne font-mono text-xs uppercase tracking-wider mb-6 flex items-center gap-1.5 transition-colors group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Все услуги
                        </button>

                        <div className="flex items-center gap-3 mb-4 flex-wrap text-champagne/90">
                            <span className="text-xs font-mono uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                {service.price}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 tracking-tight leading-[1.05] drop-shadow-lg">
                            {service.title}
                        </h1>

                        <p className="text-white/80 text-lg font-light italic max-w-3xl leading-relaxed">
                            {service.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left side */}
                <div className="lg:col-span-2">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading text-t-text mb-6 tracking-tight">
                            Описание услуги
                        </h2>
                        <p className="text-t-muted text-base md:text-lg leading-relaxed font-sans font-light">
                            {service.description}
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {service.features.map((feat, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-t-border bg-t-card shadow-md">
                                <h3 className="text-t-strong font-heading font-medium text-lg mb-2">
                                    {feat.title}
                                </h3>
                                <p className="text-t-subtle text-xs md:text-sm leading-relaxed font-sans font-light">
                                    {feat.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Process Steps */}
                    <div className="border-t border-t-border pt-12">
                        <h2 className="text-2xl md:text-3xl font-heading text-t-text mb-8 tracking-tight">
                            Как заказать и получить услугу
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.process.map((step, i) => (
                                <div key={i} className="p-6 rounded-2xl border border-t-border bg-t-card/45 relative shadow-md">
                                    <span className="absolute top-4 right-4 text-t-strong/15 font-mono text-3xl font-bold">
                                        0{i + 1}
                                    </span>
                                    <h4 className="text-t-text font-heading font-medium text-sm mb-2">Шаг 0{i + 1}</h4>
                                    <p className="text-t-subtle text-xs leading-relaxed font-sans font-light">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20 bg-t-card border border-t-border rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-t-strong" />

                        <div className="mb-6">
                            <span className="font-mono text-t-text/50 text-[10px] tracking-widest uppercase block mb-1">Тариф</span>
                            <div className="text-3xl md:text-4xl font-heading font-bold text-t-text tracking-tight mb-2">
                                {service.price}
                            </div>
                            <p className="text-t-subtle text-xs leading-relaxed font-sans font-light">
                                Все расчеты прозрачны. Стоимость фиксируется в договоре и не меняется в процессе оказания услуг.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={openLeadModal}
                                className="btn-card btn-card-primary justify-center py-4 rounded-xl w-full flex items-center gap-2"
                            >
                                <span>Оставить заявку</span>
                                <ChevronRight size={16} />
                            </button>
                            <a
                                href="https://wa.me/+79141589504"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-card btn-card-secondary justify-center py-4 rounded-xl w-full flex items-center gap-2 border border-t-border"
                            >
                                <span>Написать в WhatsApp</span>
                            </a>
                        </div>

                        <div className="border-t border-t-border mt-6 pt-6 text-t-muted text-xs leading-relaxed font-sans font-light space-y-4">
                            <div className="flex items-center gap-2">
                                <Shield className="text-t-strong shrink-0" size={16} />
                                <span>100% официальные документы</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="text-t-strong shrink-0" size={16} />
                                <span>Быстрая обработка заявок</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
