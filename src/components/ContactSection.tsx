import React from 'react';
import Magnetic from './Magnetic';

const ContactSection: React.FC = () => {
    return (
        <section className="bg-transparent relative w-full h-full flex flex-col justify-center px-4 sm:px-6">
            <div className="container-main w-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center">
                <span className="font-mono text-t-strong/80 text-[10px] tracking-[0.4em] uppercase mb-6 block">Экспедиция V.01</span>

                <h2 className="text-t-text text-5xl md:text-7xl font-heading font-light tracking-tight leading-tight">
                    Заявка <span className="text-t-text/90">на премиум</span>
                </h2>

                <p className="text-t-text/60 font-sans font-light text-sm md:text-base max-w-lg mb-12">
                    Наши эксперты свяжутся с вами в течение 15 минут, чтобы обсудить детали и подготовить индивидуальный маршрут.
                </p>

                <form className="w-full max-w-md flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full bg-t-glass border border-t-border rounded-xl px-6 py-4 text-t-text font-sans focus:outline-none focus:border-t-strong/50 focus:bg-white/10 transition-colors"
                    />
                    <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-t-glass border border-t-border rounded-xl px-6 py-4 text-t-text font-sans focus:outline-none focus:border-t-strong/50 focus:bg-white/10 transition-colors"
                    />

                    <Magnetic strength={15}>
                        <button
                            type="submit"
                            className="w-full mt-4 bg-champagne text-t-bg font-mono font-bold text-[11px] tracking-[0.25em] uppercase px-8 py-5 rounded-xl shadow-[0_0_20px_rgba(247,231,206,0.3)] hover:shadow-[0_0_35px_rgba(247,231,206,0.5)] transition-all duration-500"
                        >
                            Отправить запрос
                        </button>
                    </Magnetic>
                </form>

                <p className="text-t-text/30 text-xs mt-8">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
            </div>
        </section>
    );
};

export default ContactSection;
