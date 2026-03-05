import React from 'react';
import { ShieldCheck, PlaneTakeoff, HeartPulse, ExternalLink, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
    return (
        <div className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-moss/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

            <div className="mb-12">
                <div className="flex items-center space-x-3 mb-2">
                    <ShieldCheck className="w-6 h-6 text-moss" />
                    <h1 className="text-3xl md:text-4xl font-serif font-bold italic text-charcoal">Протокол Активен</h1>
                </div>
                <p className="text-charcoal/60 font-sans text-lg max-w-2xl">
                    Добро пожаловать в закрытый контур. Ниже представлен статус ваших текущих операций и подключенных модулей.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Main Status Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Active Visa Protocol */}
                    <div className="bg-cream-dark p-8 rounded-3xl border border-charcoal/5 shadow-sm relative overflow-hidden group hover:border-moss/30 transition-colors">
                        <div className="absolute top-0 left-0 w-2 h-full bg-moss"></div>

                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <span className="text-xs font-mono uppercase tracking-widest text-charcoal/40 font-bold block mb-1">Кейс #402-IT</span>
                                <h3 className="text-2xl font-sans font-bold text-charcoal">Шенгенская виза (Италия)</h3>
                            </div>
                            <div className="bg-moss/10 text-moss px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-moss mr-2 animate-pulse"></span>
                                В обработке
                            </div>
                        </div>

                        {/* Progress Bar Timeline */}
                        <div className="relative pt-4 pb-8">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-charcoal/10 rounded-full -translate-y-1/2"></div>
                            <div className="absolute top-1/2 left-0 w-[65%] h-1 bg-moss rounded-full -translate-y-1/2 transition-all duration-1000"></div>

                            <div className="flex justify-between relative z-10">
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-4 rounded-full bg-moss border-4 border-cream-dark mb-2"></div>
                                    <span className="text-[10px] font-mono text-charcoal/50 uppercase mt-2 text-center absolute -bottom-6">Сборка<br />досье</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-4 rounded-full bg-moss border-4 border-cream-dark mb-2"></div>
                                    <span className="text-[10px] font-mono text-charcoal/50 uppercase mt-2 text-center absolute -bottom-6">Запись в<br />вц</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-moss text-cream flex items-center justify-center border-4 border-cream-dark shadow-sm">
                                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                    </div>
                                    <span className="text-[10px] font-mono text-moss font-bold uppercase mt-2 text-center absolute -bottom-6">Рассмотрение<br />консулом</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-4 rounded-full bg-charcoal/20 border-4 border-cream-dark mb-2"></div>
                                    <span className="text-[10px] font-mono text-charcoal/40 uppercase mt-2 text-center absolute -bottom-6">Выдача<br />паспорта</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-charcoal/10 flex justify-between items-center text-sm font-sans">
                            <span className="text-charcoal/60 flex items-center"><Clock className="w-4 h-4 mr-2" /> Обновлено: 2 часа назад</span>
                            <button className="text-moss hover:text-moss-dark font-medium flex items-center group-hover:underline">
                                Архив документов <ExternalLink className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Ecosystem Sidebar */}
                <div className="space-y-6">
                    <h4 className="text-sm font-sans font-bold text-charcoal/40 uppercase tracking-widest pl-2">Интегрированные модули</h4>

                    <div className="bg-charcoal text-cream rounded-3xl p-6 border border-white/5 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-clay/20 rounded-full filter blur-[20px]"></div>
                        <div className="flex items-center space-x-4 mb-4 relative z-10">
                            <div className="p-3 bg-white/10 rounded-xl">
                                <PlaneTakeoff className="w-5 h-5 text-clay-light" />
                            </div>
                            <div>
                                <h5 className="font-sans font-bold">Авиаперелет</h5>
                                <p className="text-xs text-cream/50 font-mono tracking-widest">БРОНЬ ПОДТВЕРЖДЕНА</p>
                            </div>
                        </div>
                        <div className="text-sm text-cream/70 font-sans border-t border-white/10 pt-4 mt-2">
                            <div className="flex justify-between mb-1"><span>SVO (Москва)</span> <span>MXP (Милан)</span></div>
                            <div className="flex justify-between text-xs text-cream/40"><span>12 Окт 2026</span> <span>Прямой рейс</span></div>
                        </div>
                    </div>

                    <div className="bg-charcoal text-cream rounded-3xl p-6 border border-white/5 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-moss/20 rounded-full filter blur-[20px]"></div>
                        <div className="flex items-center space-x-4 mb-4 relative z-10">
                            <div className="p-3 bg-white/10 rounded-xl">
                                <HeartPulse className="w-5 h-5 text-moss-light" />
                            </div>
                            <div>
                                <h5 className="font-sans font-bold">Страхование</h5>
                                <p className="text-xs text-cream/50 font-mono tracking-widest">ПОЛИС АКТИВЕН</p>
                            </div>
                        </div>
                        <div className="text-sm text-cream/70 font-sans border-t border-white/10 pt-4 mt-2">
                            <div className="flex justify-between mb-1"><span>Покрытие €100,000</span></div>
                            <button className="text-moss-light text-xs hover:underline mt-2">Скачать полис PDF</button>
                        </div>
                    </div>

                    {/* Upsell Logic */}
                    <button className="w-full py-4 border border-charcoal/20 border-dashed rounded-2xl text-charcoal/60 font-sans text-sm hover:border-charcoal hover:text-charcoal transition-colors flex items-center justify-center">
                        + Подключить новый модуль
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
