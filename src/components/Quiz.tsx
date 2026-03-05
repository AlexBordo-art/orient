import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Quiz: React.FC = () => {
    const [step, setStep] = useState(1);
    const [destination, setDestination] = useState('');
    const [history, setHistory] = useState('');

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleReset = () => {
        setStep(1);
        setDestination('');
        setHistory('');
    };

    return (
        <section id="quiz" className="py-24 bg-cream relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-moss/5 relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-cream-dark">
                        <div
                            className="h-full bg-clay transition-all duration-500 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-xs font-mono font-bold text-clay tracking-widest uppercase mb-4">Телеметрия шансов</h2>
                        <h3 className="text-3xl md:text-4xl font-serif text-charcoal font-bold">Оцените вероятность <br />одобрения визы</h3>
                    </div>

                    {/* Step 1: Destination */}
                    <div className={`transition-all duration-500 ${step === 1 ? 'opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-10'}`}>
                        <h4 className="text-lg font-sans text-charcoal mb-6 text-center">Куда вы планируете отправиться?</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {['Шенгенская зона', 'США', 'Великобритания', 'Азия (Япония/Китай)'].map((dest) => (
                                <button
                                    key={dest}
                                    onClick={() => { setDestination(dest); handleNext(); }}
                                    className={`py-4 px-6 rounded-2xl border text-left font-sans transition-all ${destination === dest
                                            ? 'border-moss bg-moss/5 text-moss font-medium'
                                            : 'border-charcoal/10 hover:border-moss/50 text-charcoal/70'
                                        }`}
                                >
                                    {dest}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: History */}
                    <div className={`transition-all duration-500 ${step === 2 ? 'opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-10'}`}>
                        <h4 className="text-lg font-sans text-charcoal mb-6 text-center">Какая у вас визовая история за последние 3 года?</h4>
                        <div className="grid grid-cols-1 gap-4 mb-8">
                            {[
                                'Много поездок, были шенгены/визы США',
                                'Были поездки только в безвизовые страны',
                                'Чистый паспорт, поездок не было',
                                'Был отказ в визе'
                            ].map((hist) => (
                                <button
                                    key={hist}
                                    onClick={() => { setHistory(hist); handleNext(); }}
                                    className={`py-4 px-6 rounded-2xl border text-left font-sans transition-all ${history === hist
                                            ? 'border-moss bg-moss/5 text-moss font-medium'
                                            : 'border-charcoal/10 hover:border-moss/50 text-charcoal/70'
                                        }`}
                                >
                                    {hist}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setStep(1)} className="text-sm font-sans text-charcoal/50 hover:text-charcoal transition-colors">
                            ← Назад
                        </button>
                    </div>

                    {/* Step 3: Result */}
                    <div className={`transition-all duration-500 text-center ${step === 3 ? 'opacity-100 scale-100' : 'hidden opacity-0 scale-95'}`}>
                        <div className="w-20 h-20 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-moss" />
                        </div>
                        <h4 className="text-2xl font-serif text-charcoal mb-4">Предварительный анализ готов</h4>
                        <p className="text-charcoal/70 font-sans mb-8 max-w-md mx-auto">
                            На основе ваших ответов ({destination}), мы сформировали первичную стратегию. Оставьте заявку для получения детального разбора шансов от визового эксперта.
                        </p>

                        <div className="space-y-4 max-w-sm mx-auto">
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                className="w-full bg-cream rounded-xl px-6 py-4 border border-charcoal/5 focus:outline-none focus:border-moss transition-colors font-sans"
                            />
                            <input
                                type="tel"
                                placeholder="+7 (999) 000-00-00"
                                className="w-full bg-cream rounded-xl px-6 py-4 border border-charcoal/5 focus:outline-none focus:border-moss transition-colors font-sans"
                            />
                            <button className="w-full bg-clay text-cream rounded-2xl font-sans font-medium py-4 px-6 flex items-center justify-center hover:bg-clay-light transition-colors magnetic-button group mt-2">
                                <span>Получить разбор</span>
                                <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <button onClick={handleReset} className="mt-8 text-xs font-mono text-charcoal/40 hover:text-charcoal transition-colors uppercase tracking-widest">
                            Пройти заново
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Quiz;
