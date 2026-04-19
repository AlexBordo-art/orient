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
                    <h2 className="text-t-strong text-sm font-mono font-bold tracking-[0.25em] uppercase mb-4">Инвестиции в спокойствие</h2>
                    <h3 className="text-t-text text-5xl md:text-6xl font-heading italic">Прозрачные тарифы</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Base Tier */}
                    <div className="glass-card p-8 flex flex-col justify-between">
                        <div>
                            <h4 className="text-2xl font-heading text-t-text mb-2">Консультация</h4>
                            <p className="text-t-muted text-sm font-sans font-light mb-6">Аудит вашей ситуации и точный план действий.</p>
                            <div className="text-4xl font-bold font-sans text-t-text mb-8">
                                Бесплатно
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Оценка шансов на визу', 'Выбор типа визы', 'Список документов', 'Расчет стоимости'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-sans text-t-muted">
                                        <Check className="w-5 h-5 text-t-strong mr-3 shrink-0" strokeWidth={1.5} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Magnetic strength={10}>
                            <button className="btn-ghost-premium w-full">
                                Получить консультацию
                            </button>
                        </Magnetic>
                        <p className="text-center text-t-subtle text-xs mt-3">Ответим за 15 минут в рабочее время</p>
                    </div>

                    {/* Premium Tier (Middle) - Highlighted */}
                    <div className="relative overflow-hidden group transform md:-translate-y-4 rounded-3xl p-8 lg:p-10 shadow-2xl border border-t-strong/30 flex flex-col justify-between"
                        style={{ background: 'var(--color-bg-elevated)' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] transform group-hover:scale-150 transition-transform duration-700" style={{ background: 'var(--color-accent-strong)', opacity: 0.2 }} />
                        <div className="relative z-10">
                            <div className="inline-block bg-t-strong text-t-bg text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-[0.2em] font-mono">
                                Хит продаж
                            </div>
                            <h4 className="text-2xl font-heading text-t-text mb-2">Виза «Под ключ»</h4>
                            <p className="text-t-muted text-sm font-sans font-light mb-6">Снимаем бюрократию. От вас только паспорт.</p>
                            <div className="text-4xl font-bold font-sans text-t-text mb-8">
                                от 3 000 ₽ <span className="text-sm text-t-subtle font-normal">/ услуга</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Заполнение всех анкет', 'Перевод документов', 'Бронь авиа и отелей', 'Запись в консульство/ВЦ', 'Сопровождение'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-sans text-t-text">
                                        <Check className="w-5 h-5 text-t-strong mr-3 shrink-0" strokeWidth={1.5} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Magnetic strength={10}>
                            <button className="btn-premium w-full justify-center group/btn relative z-10">
                                Оформить визу <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </Magnetic>
                        <p className="text-center text-t-subtle text-xs mt-3 relative z-10">Гарантия: вернём деньги при отказе консульства</p>
                    </div>

                    {/* VIP Tier */}
                    <div className="glass-card p-8 flex flex-col justify-between">
                        <div>
                            <h4 className="text-2xl font-heading text-t-text mb-2">Комплексный Тур</h4>
                            <p className="text-t-muted text-sm font-sans font-light mb-6">Виза + билеты + отель + страховка + программа.</p>
                            <div className="text-4xl font-bold font-sans text-t-text mb-8">
                                Индивид.
                            </div>
                            <ul className="space-y-4 mb-10">
                                {['Оформление визы', 'Билеты по лучшим ценам', 'Подбор отелей', 'Трансферы и гиды', 'Ассистент 24/7'].map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-sans text-t-muted">
                                        <Check className="w-5 h-5 text-t-strong mr-3 shrink-0" strokeWidth={1.5} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Magnetic strength={10}>
                            <button className="btn-ghost-premium w-full">
                                Рассчитать тур
                            </button>
                        </Magnetic>
                    </div>
                </div>
            </div>

            {/* Portal Footer with navigation zones */}
            <div className="border-t border-t-border py-16 rounded-t-[3rem] lg:rounded-t-[4rem]"
                style={{ background: 'color-mix(in srgb, var(--color-bg-elevated) 80%, transparent)', backdropFilter: 'blur(24px)' }}>
                <div className="container-main grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-t-bg text-sm font-mono font-bold bg-t-strong">OE</div>
                            <span className="font-heading text-2xl font-bold tracking-tight text-t-text">Ориент Экспресс.</span>
                        </div>
                        <p className="text-sm font-sans font-light text-t-muted leading-relaxed mb-6">
                            Специализированное бюро путешествий и визовой поддержки. Работаем с 2007 года.
                        </p>
                        <div className="flex gap-4 text-t-subtle text-xs font-mono uppercase tracking-widest">
                            <span>Хабаровск</span>
                            <span>·</span>
                            <span>Москва</span>
                        </div>
                    </div>

                    {/* Column 1: Визы */}
                    <div>
                        <h5 className="font-mono font-semibold text-t-strong mb-4 tracking-[0.25em] uppercase text-xs">Визы</h5>
                        <ul className="space-y-3 text-sm font-sans font-light text-t-muted">
                            <li><Link to="/visas/china" className="hover:text-t-strong transition-colors">Виза в Китай</Link></li>
                            <li><Link to="/visas/korea" className="hover:text-t-strong transition-colors">Виза в Корею</Link></li>
                            <li><Link to="/visas/schengen" className="hover:text-t-strong transition-colors">Шенгенская виза</Link></li>
                            <li><Link to="/visas" className="hover:text-t-strong transition-colors font-medium text-t-accent">Все визы →</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Путешествия */}
                    <div>
                        <h5 className="font-mono font-semibold text-t-strong mb-4 tracking-[0.25em] uppercase text-xs">Путешествия</h5>
                        <ul className="space-y-3 text-sm font-sans font-light text-t-muted">
                            <li><Link to="/tours/china" className="hover:text-t-strong transition-colors">Туры в Китай</Link></li>
                            <li><Link to="/tours/russia" className="hover:text-t-strong transition-colors">По России</Link></li>
                            <li><Link to="/tours/hot-deals" className="hover:text-t-strong transition-colors">Горящие туры</Link></li>
                            <li><Link to="/tours" className="hover:text-t-strong transition-colors font-medium text-t-accent">Все туры →</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Компания */}
                    <div>
                        <h5 className="font-mono font-semibold text-t-strong mb-4 tracking-[0.25em] uppercase text-xs">Компания</h5>
                        <ul className="space-y-3 text-sm font-sans font-light text-t-muted">
                            <li><Link to="/education" className="hover:text-t-strong transition-colors">Образование</Link></li>
                            <li><Link to="/services" className="hover:text-t-strong transition-colors">Сервисы</Link></li>
                            <li><span className="hover:text-t-strong transition-colors cursor-pointer">+7 (937) 762-55-72</span></li>
                            <li><span className="hover:text-t-strong transition-colors cursor-pointer">visa@orient-dv.ru</span></li>
                        </ul>
                    </div>
                </div>

                <div className="container-main mt-16 pt-8 border-t border-t-border flex flex-col md:flex-row justify-between items-center text-xs font-mono font-light text-t-subtle uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} ОРИЕНТ ЭКСПРЕСС. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-t-text transition-colors">Политика конфиденциальности</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PricingFooter;
