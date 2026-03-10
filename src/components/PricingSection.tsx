import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

const PricingSection: React.FC = () => {
    return (
        <section id="pricing" className="bg-transparent relative pt-24 pb-16 z-10">
            <div className="container-main">
                <div className="text-center mb-16">
                    <h2 className="text-accent text-sm font-mono font-bold tracking-[0.2em] uppercase mb-4">Инвестиции в спокойствие</h2>
                    <h3 className="text-cream text-5xl md:text-6xl font-heading italic">Прозрачные тарифы</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Base Tier */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:bg-white/10 transition-colors duration-300">
                        <div>
                            <h4 className="text-2xl font-heading text-cream mb-2">Консультация</h4>
                            <p className="text-cream/60 text-sm font-sans font-light mb-6">Аудит вашей ситуации и точный план действий.</p>
                            <div className="text-4xl font-bold font-sans text-cream mb-8">
                                Бесплатно
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Оценка шансов на визу', 'Выбор типа визы', 'Список документов', 'Расчет стоимости'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-sans text-cream/80">
                                        <Check className="w-5 h-5 text-accent mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Magnetic strength={10}>
                            <button className="w-full inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium cursor-pointer text-cream border-[1.5px] border-white/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 justify-center">
                                Получить консультацию
                            </button>
                        </Magnetic>
                        <p className="text-center text-cream/30 text-xs mt-3">Ответим за 15 минут в рабочее время</p>
                    </div>

                    {/* Mid Tier — Highlighted */}
                    <div className="bg-obsidian-light/80 backdrop-blur-xl border-2 border-champagne/30 rounded-3xl p-8 shadow-2xl shadow-champagne/10 flex flex-col justify-between relative">
                        <span className="absolute -top-3 right-6 bg-champagne text-obsidian-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">хит продаж</span>
                        <div>
                            <h4 className="text-2xl font-heading text-cream mb-2">Виза «Под ключ»</h4>
                            <p className="text-cream/70 text-sm font-sans font-light mb-6">Снимаем бюрократию. От вас только паспорт.</p>
                            <div className="text-4xl font-bold font-sans text-cream mb-8">
                                от 3 000 ₽ <span className="text-base font-light text-cream/50">/ услуга</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Заполнение всех анкет', 'Перевод документов', 'Бронь авиа и отелей', 'Запись в консульство/ВЦ', 'Сопровождение'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-sans text-cream/90">
                                        <Check className="w-5 h-5 text-champagne mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Magnetic strength={10}>
                            <Link
                                to="/visas"
                                className="w-full inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold cursor-pointer bg-gradient-to-r from-champagne-light to-champagne text-obsidian-dark hover:opacity-90 transition-all duration-300 justify-center"
                            >
                                Оформить визу <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </Magnetic>
                        <p className="text-center text-cream/40 text-xs mt-3">Гарантия: вернём деньги при отказе консульства</p>
                    </div>

                    {/* High Tier */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:bg-white/10 transition-colors duration-300">
                        <div>
                            <h4 className="text-2xl font-heading text-cream mb-2">Комплексный Тур</h4>
                            <p className="text-cream/60 text-sm font-sans font-light mb-6">Виза + билеты + отель + страховка + программа.</p>
                            <div className="text-4xl font-bold font-sans text-cream mb-8">
                                Индивид.
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Оформление визы', 'Билеты по лучшим ценам', 'Подбор отелей', 'Трансферы и гиды', 'Ассистент 24/7'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-sans text-cream/80">
                                        <Check className="w-5 h-5 text-accent mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Magnetic strength={10}>
                            <Link
                                to="/tours"
                                className="w-full inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium cursor-pointer text-cream border-[1.5px] border-white/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 justify-center"
                            >
                                Рассчитать тур
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
