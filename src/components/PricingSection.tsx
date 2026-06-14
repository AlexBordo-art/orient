import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, Layers } from 'lucide-react';
import Magnetic from './Magnetic';

const PricingSection: React.FC = () => {
    return (
        <section id="pricing" className="bg-transparent relative w-full h-full flex flex-col justify-center px-4 sm:px-6">
            <div className="container-main w-full max-w-7xl mx-auto flex flex-col justify-center stretch lg:h-auto min-h-0">
                <div className="text-center mb-6 md:mb-10 shrink-0">
                    <span className="text-t-strong drop-shadow-xl text-[10px] font-mono font-bold tracking-[0.4em] uppercase mb-2 md:mb-3 block">Инвестиции в спокойствие</span>
                    <h2 className="text-t-text text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight leading-tight">Прозрачные <span className="text-t-text/90">тарифы</span></h2>
                </div>

                <div
                    className="flex flex-row md:grid md:grid-cols-3 gap-4 lg:gap-6 overflow-x-auto md:overflow-visible pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Base Tier */}
                    <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-auto bg-t-card backdrop-blur-xl border border-t-border rounded-xl p-5 lg:p-6 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-white/30 group">
                        <div>
                            <span className="font-mono text-t-text/50 text-[10px] tracking-widest uppercase">Основа</span>
                            <h3 className="text-2xl font-heading text-t-text mt-1 mb-2 italic">Консультация</h3>
                            <p className="text-t-text/60 text-xs font-sans font-light mb-4">Аудит вашей ситуации и точный план действий.</p>

                            <ul className="space-y-2 lg:space-y-3 mb-6">
                                {['Оценка шансов на визу', 'Выбор типа визы', 'Список документов', 'Расчет стоимости'].map((feature, i) => (
                                    <li key={i} className="flex items-center text-xs lg:text-sm font-sans text-t-text/80">
                                        <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-t-strong/70 mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <div className="text-2xl lg:text-3xl font-bold font-heading text-t-text mb-4">
                                Бесплатно
                            </div>
                            <Magnetic strength={10}>
                                <button className="btn-card btn-card-secondary justify-center py-3 lg:py-4 rounded-lg">
                                    Получить консультацию
                                </button>
                            </Magnetic>
                            <p className="text-center text-t-text/30 text-[10px] mt-3">Ответим за 15 минут в рабочее время</p>
                        </div>
                    </div>

                    {/* Mid Tier — Highlighted */}
                    <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-auto bg-t-card backdrop-blur-xl border border-champagne/30 rounded-xl p-5 lg:p-8 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group md:-translate-y-3">
                        <div className="absolute top-0 right-0 p-4 lg:p-6 flex items-center gap-2">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-t-strong/80">Хит продаж</span>
                            <div className="w-2 h-2 rounded-full bg-t-strong animate-pulse shadow-[0_0_10px_#F7E7CE]"></div>
                        </div>
                        <div>
                            <span className="font-mono text-t-strong text-[10px] tracking-widest uppercase">Стандарт</span>
                            <h3 className="text-3xl lg:text-4xl font-heading text-t-strong mt-1 mb-2 italic drop-shadow-md">Виза «Под ключ»</h3>
                            <p className="text-t-text/70 text-xs font-sans font-light mb-4">Снимаем бюрократию. От вас только паспорт.</p>

                            <ul className="space-y-2 lg:space-y-3 mb-6">
                                {['Заполнение всех анкет', 'Перевод документов', 'Бронь авиа и отелей', 'Запись в консульство/ВЦ', 'Сопровождение'].map((feature, i) => (
                                    <li key={i} className="flex items-center text-xs lg:text-sm font-sans text-t-text/90">
                                        <Compass className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-t-strong mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <div className="text-2xl lg:text-3xl font-bold font-heading text-t-text mb-4">
                                от 3 000 ₽ <span className="text-[10px] font-mono tracking-tighter text-t-text/50 uppercase">/ услуга</span>
                            </div>
                            <Magnetic strength={10}>
                                <Link
                                    to="/visas"
                                    className="btn-card btn-card-primary justify-center py-3 lg:py-4 rounded-lg"
                                >
                                    Оформить визу
                                </Link>
                            </Magnetic>
                            <p className="text-center text-t-text/40 text-[10px] mt-3">Гарантия: вернём деньги при отказе</p>
                        </div>
                    </div>

                    {/* High Tier */}
                    <div className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-auto bg-t-card backdrop-blur-xl border border-t-border rounded-xl p-5 lg:p-6 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-white/30 group">
                        <div>
                            <span className="font-mono text-t-text/50 text-[10px] tracking-widest uppercase">Премиум</span>
                            <h3 className="text-2xl font-heading text-t-text mt-1 mb-2 italic">Комплексный Тур</h3>
                            <p className="text-t-text/60 text-xs font-sans font-light mb-4">Виза + билеты + отель + страховка + программа.</p>

                            <ul className="space-y-2 lg:space-y-3 mb-6">
                                {['Оформление визы', 'Билеты по лучшим ценам', 'Подбор отелей', 'Трансферы и гиды', 'Ассистент 24/7'].map((feature, i) => (
                                    <li key={i} className="flex items-center text-xs lg:text-sm font-sans text-t-text/80">
                                        <Layers className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-t-strong/70 mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <div className="text-2xl lg:text-3xl font-bold font-heading text-t-text mb-4">
                                Индивид.
                            </div>
                            <Magnetic strength={10}>
                                <Link
                                    to="/tours"
                                    className="btn-card btn-card-secondary justify-center py-3 lg:py-4 rounded-lg"
                                >
                                    Рассчитать тур
                                </Link>
                            </Magnetic>
                            <p className="text-center text-transparent text-[10px] mt-3">_</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
