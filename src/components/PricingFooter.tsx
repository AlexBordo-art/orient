import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

const PricingFooter: React.FC = () => {
    return (
        <footer id="pricing" className="bg-transparent relative pt-24 z-10">
            {/* Pricing Section */}
            <div className="container-main mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-accent text-sm font-data font-bold tracking-[0.2em] uppercase mb-4">Инвестиции в спокойствие</h2>
                    <h3 className="text-cream text-5xl md:text-6xl font-drama italic">Прозрачные тарифы</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Base Tier */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:bg-white/10 transition-colors duration-300">
                        <div>
                            <h4 className="text-2xl font-heading text-cream mb-2">Консультация</h4>
                            <p className="text-cream/60 text-sm font-body font-light mb-6">Аудит вашей ситуации и точный план действий.</p>
                            <div className="text-4xl font-bold font-body text-cream mb-8">
                                Бесплатно
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Оценка шансов на визу', 'Выбор типа визы', 'Список документов', 'Расчет стоимости'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-body text-cream/80">
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

                    {/* Premium Tier (Middle) - Highlighted */}
                    <div className="bg-primary/80 backdrop-blur-2xl border border-accent/20 rounded-3xl text-white p-8 lg:p-10 shadow-2xl relative overflow-hidden group transform md:-translate-y-4 flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] transform group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative z-10">
                            <div className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider font-data">
                                Хит продаж
                            </div>
                            <h4 className="text-2xl font-heading text-cream mb-2">Виза «Под ключ»</h4>
                            <p className="text-cream/70 text-sm font-body font-light mb-6">Снимаем бюрократию. От вас только паспорт.</p>
                            <div className="text-4xl font-bold font-body text-cream mb-8">
                                от 3 000 ₽ <span className="text-sm text-cream/40 font-normal">/ услуга</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Заполнение всех анкет', 'Перевод документов', 'Бронь авиа и отелей', 'Запись в консульство/ВЦ', 'Сопровождение'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-body text-cream/90">
                                        <Check className="w-5 h-5 text-accent mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Magnetic strength={10}>
                            <button className="w-full bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2 group/btn relative z-10">
                                Оформить визу <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </Magnetic>
                        <p className="text-center text-cream/40 text-xs mt-3 relative z-10">Гарантия: вернём деньги при отказе консульства</p>
                    </div>

                    {/* VIP Tier */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:bg-white/10 transition-colors duration-300">
                        <div>
                            <h4 className="text-2xl font-heading text-cream mb-2">Комплексный Тур</h4>
                            <p className="text-cream/60 text-sm font-body font-light mb-6">Виза + билеты + отель + страховка + программа.</p>
                            <div className="text-4xl font-bold font-body text-cream mb-8">
                                Индивид.
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Оформление визы', 'Билеты по лучшим ценам', 'Подбор отелей', 'Трансферы и гиды', 'Ассистент 24/7'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-body text-cream/80">
                                        <Check className="w-5 h-5 text-accent mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Magnetic strength={10}>
                            <button className="w-full inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium cursor-pointer text-cream border-[1.5px] border-white/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 justify-center">
                                Рассчитать тур
                            </button>
                        </Magnetic>
                    </div>
                </div>
            </div>

            {/* Portal Footer with navigation zones */}
            <div className="bg-charcoal/80 backdrop-blur-3xl border-t border-white/5 py-16 text-white rounded-t-[3rem] lg:rounded-t-[4rem]">
                <div className="container-main grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-primary text-sm font-data font-bold bg-accent">OE</div>
                            <span className="font-heading text-2xl font-bold tracking-tight text-cream">Orient Express.</span>
                        </div>
                        <p className="text-sm font-body font-light text-cream/50 leading-relaxed mb-6">
                            Специализированное бюро путешествий и визовой поддержки. Работаем с 2010 года.
                        </p>
                        <div className="flex gap-4 text-cream/40 text-xs font-data">
                            <span>Хабаровск</span>
                            <span>·</span>
                            <span>Москва</span>
                        </div>
                    </div>

                    {/* Column 1: Визы */}
                    <div>
                        <h5 className="font-body font-semibold text-accent mb-4 tracking-wider uppercase text-sm">Визы</h5>
                        <ul className="space-y-3 text-sm font-body font-light text-cream/70">
                            <li><Link to="/visas/china" className="hover:text-accent transition-colors">🇨🇳 Виза в Китай</Link></li>
                            <li><Link to="/visas/korea" className="hover:text-accent transition-colors">🇰🇷 Виза в Корею</Link></li>
                            <li><Link to="/visas/schengen" className="hover:text-accent transition-colors">🇪🇺 Шенгенская виза</Link></li>
                            <li><Link to="/visas" className="hover:text-accent transition-colors font-medium text-champagne/80">Все визы →</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Путешествия */}
                    <div>
                        <h5 className="font-body font-semibold text-accent mb-4 tracking-wider uppercase text-sm">Путешествия</h5>
                        <ul className="space-y-3 text-sm font-body font-light text-cream/70">
                            <li><Link to="/tours/china" className="hover:text-accent transition-colors">🇨🇳 Туры в Китай</Link></li>
                            <li><Link to="/tours/russia" className="hover:text-accent transition-colors">🇷🇺 По России</Link></li>
                            <li><Link to="/tours/hot-deals" className="hover:text-accent transition-colors">🔥 Горящие туры</Link></li>
                            <li><Link to="/tours" className="hover:text-accent transition-colors font-medium text-champagne/80">Все туры →</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Компания */}
                    <div>
                        <h5 className="font-body font-semibold text-accent mb-4 tracking-wider uppercase text-sm">Компания</h5>
                        <ul className="space-y-3 text-sm font-body font-light text-cream/70">
                            <li><Link to="/education" className="hover:text-accent transition-colors">Образование</Link></li>
                            <li><Link to="/services" className="hover:text-accent transition-colors">Сервисы</Link></li>
                            <li><span className="hover:text-accent transition-colors cursor-pointer">+7 (937) 762-55-72</span></li>
                            <li><span className="hover:text-accent transition-colors cursor-pointer">visa@orient-dv.ru</span></li>
                        </ul>
                    </div>
                </div>

                <div className="container-main mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-data font-light text-cream/30 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} ОРИЕНТ ЭКСПРЕСС. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-cream/60 transition-colors">Политика конфиденциальности</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PricingFooter;
