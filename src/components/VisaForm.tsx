import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Magnetic from './Magnetic';

const VisaForm: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10" id="visa-form">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center">

                {/* Background glow effects */}
                <div className="absolute top-[-20%] right-[-10%] w-[50vh] h-[50vh] rounded-full bg-accent/20 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-primary/30 blur-[100px] pointer-events-none" />

                {/* Left Side: Context */}
                <div className="flex-1 relative z-10 w-full lg:max-w-md">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-pill mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                        </span>
                        <span className="text-cream text-xs font-data tracking-widest uppercase">
                            Оставить заявку
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-drama italic text-cream leading-tight mb-6">
                        Оформить визу легко.
                    </h2>

                    <p className="text-cream/60 font-body text-lg leading-relaxed mb-8">
                        Оставьте заявку, и наши специалисты свяжутся с вами для бесплатной консультации и оценки шансов на получение визы.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-cream/80 text-sm font-body">
                            <CheckCircle2 className="text-accent w-5 h-5 shrink-0" />
                            Без предоплаты за консультацию
                        </div>
                        <div className="flex items-center gap-4 text-cream/80 text-sm font-body">
                            <CheckCircle2 className="text-accent w-5 h-5 shrink-0" />
                            Высокий процент одобрения
                        </div>
                        <div className="flex items-center gap-4 text-cream/80 text-sm font-body">
                            <CheckCircle2 className="text-accent w-5 h-5 shrink-0" />
                            Поддержка АТЭС и бизнес-виз
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="flex-1 w-full bg-charcoal/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 shadow-inner relative z-10">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="group">
                            <label className="block text-xs font-data uppercase tracking-wider text-cream/50 mb-2">Имя</label>
                            <input
                                required
                                type="text"
                                placeholder="Ваше полное имя"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-cream font-body focus:outline-none focus:border-accent/50 transition-all placeholder:text-cream/20"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-data uppercase tracking-wider text-cream/50 mb-2">Телефон</label>
                            <input
                                required
                                type="tel"
                                placeholder="+7 (___) ___-__-__"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-cream font-body focus:outline-none focus:border-accent/50 transition-all placeholder:text-cream/20"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-data uppercase tracking-wider text-cream/50 mb-2">Направление / Тип визы</label>
                            <div className="relative">
                                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-cream font-body appearance-none focus:outline-none focus:border-accent/50 transition-all cursor-pointer">
                                    <option value="china">Китай (Бизнес / Туризм)</option>
                                    <option value="japan">Япония</option>
                                    <option value="korea">Южная Корея</option>
                                    <option value="apec">Карта АТЭС (APEC)</option>
                                    <option value="other">Другое / Консультация</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-cream/40">▼</div>
                            </div>
                        </div>

                        <Magnetic strength={5}>
                            <button
                                type="submit"
                                disabled={submitted}
                                className={`mt-4 w-full px-8 py-5 rounded-xl font-bold font-heading text-lg transition-all duration-300 flex items-center justify-center gap-3 group ${submitted
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                        : 'bg-cream text-primary hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                    }`}
                            >
                                {submitted ? 'Заявка отправлена!' : 'Оставить заявку'}
                                {!submitted && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                            </button>
                        </Magnetic>

                        <p className="text-center text-[10px] text-cream/30 font-body mt-2">
                            Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.
                        </p>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default VisaForm;
