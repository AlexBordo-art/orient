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
        <section className="section-padding relative z-10" id="visa-form">
            <div className="container-main">
                <div className="glass-panel p-8 md:p-12 lg:p-16 relative flex flex-col lg:flex-row gap-16 items-center">

                    {/* Background glow effects inside the panel */}
                    <div className="absolute top-[-20%] right-[-10%] w-[50vh] h-[50vh] rounded-full bg-sapphire/20 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-champagne/10 blur-[100px] pointer-events-none" />

                    {/* Left Side: Context */}
                    <div className="flex-1 relative z-10 w-full lg:max-w-md">
                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne-light" />
                            </span>
                            <span className="text-slate-200 text-xs font-mono tracking-widest uppercase font-semibold">
                                Private Application
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-slate-100 leading-tight mb-6">
                            Оформить визу легко.
                        </h2>

                        <p className="text-slate-300 font-sans font-light text-lg leading-relaxed mb-10">
                            Оставьте заявку, и ваш персональный менеджер свяжется с вами для оценки шансов на получение многократной визы.
                        </p>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4 text-slate-200 font-sans">
                                <CheckCircle2 className="text-champagne w-5 h-5 shrink-0" />
                                Без предоплаты за консультацию
                            </div>
                            <div className="flex items-center gap-4 text-slate-200 font-sans">
                                <CheckCircle2 className="text-champagne w-5 h-5 shrink-0" />
                                Высокий процент одобрения
                            </div>
                            <div className="flex items-center gap-4 text-slate-200 font-sans">
                                <CheckCircle2 className="text-champagne w-5 h-5 shrink-0" />
                                Поддержка АТЭС и бизнес-инвитаций
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="flex-1 w-full bg-obsidian-dark/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-inner relative z-10">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="group">
                                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">Имя</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Ваше полное имя"
                                    className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-slate-100 font-sans focus:outline-none focus:border-champagne transition-colors placeholder:text-slate-500"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">Телефон</label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+7 (___) ___-__-__"
                                    className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-slate-100 font-sans focus:outline-none focus:border-champagne transition-colors placeholder:text-slate-500"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">Тип визы</label>
                                <div className="relative">
                                    <select className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-slate-100 font-sans appearance-none focus:outline-none focus:border-champagne transition-colors cursor-pointer">
                                        <option value="china" className="bg-obsidian-dark text-slate-100">Китай (Бизнес / Туризм)</option>
                                        <option value="japan" className="bg-obsidian-dark text-slate-100">Япония</option>
                                        <option value="korea" className="bg-obsidian-dark text-slate-100">Южная Корея</option>
                                        <option value="apec" className="bg-obsidian-dark text-slate-100">Карта АТЭС (APEC)</option>
                                        <option value="other" className="bg-obsidian-dark text-slate-100">Консьерж-услуги / Другое</option>
                                    </select>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                </div>
                            </div>

                            <Magnetic strength={0.4}>
                                <button
                                    type="submit"
                                    disabled={submitted}
                                    className={`mt-6 w-full ${submitted ? 'btn-ghost-premium text-green-400 border-green-500/50 hover:bg-green-500/10 hover:translate-y-0' : 'btn-premium'}`}
                                >
                                    {submitted ? 'Заявка отправлена!' : 'Запросить Инвайт'}
                                    {!submitted && <Send className="w-5 h-5 ml-2" />}
                                </button>
                            </Magnetic>

                            <p className="text-center text-[11px] text-slate-500 font-sans mt-3">
                                Взаимодействие полностью конфиденциально.
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VisaForm;
