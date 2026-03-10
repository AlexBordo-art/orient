import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter: React.FC = () => {
    return (
        <footer className="bg-obsidian/90 backdrop-blur-3xl border-t border-white/5 py-16 text-white relative z-10">
            <div className="container-main grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                    <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-obsidian-dark text-sm font-mono font-bold bg-champagne">OE</div>
                        <span className="font-heading text-2xl font-bold tracking-tight text-white">Orient Express.</span>
                    </div>
                    <p className="text-sm font-sans font-light text-slate-400 leading-relaxed mb-6">
                        Специализированное бюро путешествий и визовой поддержки. Работаем с 2007 года.
                    </p>
                    <div className="flex gap-4 text-slate-500 text-xs font-mono">
                        <span>Хабаровск</span>
                        <span>·</span>
                        <span>Москва</span>
                    </div>
                </div>

                {/* Column 1: Визы */}
                <div>
                    <h5 className="font-sans font-semibold text-champagne mb-4 tracking-wider uppercase text-sm">Визы</h5>
                    <ul className="space-y-3 text-sm font-sans font-light text-slate-400">
                        <li><Link to="/visas/china" className="hover:text-champagne transition-colors">🇨🇳 Виза в Китай</Link></li>
                        <li><Link to="/visas/korea" className="hover:text-champagne transition-colors">🇰🇷 Виза в Корею</Link></li>
                        <li><Link to="/visas/schengen" className="hover:text-champagne transition-colors">🇪🇺 Шенгенская виза</Link></li>
                        <li><Link to="/visas" className="hover:text-champagne transition-colors font-medium text-champagne/80">Все визы →</Link></li>
                    </ul>
                </div>

                {/* Column 2: Путешествия */}
                <div>
                    <h5 className="font-sans font-semibold text-champagne mb-4 tracking-wider uppercase text-sm">Путешествия</h5>
                    <ul className="space-y-3 text-sm font-sans font-light text-slate-400">
                        <li><Link to="/tours/china" className="hover:text-champagne transition-colors">🇨🇳 Туры в Китай</Link></li>
                        <li><Link to="/tours/russia" className="hover:text-champagne transition-colors">🇷🇺 По России</Link></li>
                        <li><Link to="/tours/hot-deals" className="hover:text-champagne transition-colors">🔥 Горящие туры</Link></li>
                        <li><Link to="/tours" className="hover:text-champagne transition-colors font-medium text-champagne/80">Все туры →</Link></li>
                    </ul>
                </div>

                {/* Column 3: Компания */}
                <div>
                    <h5 className="font-sans font-semibold text-champagne mb-4 tracking-wider uppercase text-sm">Компания</h5>
                    <ul className="space-y-3 text-sm font-sans font-light text-slate-400">
                        <li><Link to="/education" className="hover:text-champagne transition-colors">Образование</Link></li>
                        <li><Link to="/services" className="hover:text-champagne transition-colors">Сервисы</Link></li>
                        <li><a href="tel:+79377625572" className="hover:text-champagne transition-colors">+7 (937) 762-55-72</a></li>
                        <li><a href="mailto:visa@orient-dv.ru" className="hover:text-champagne transition-colors">visa@orient-dv.ru</a></li>
                    </ul>
                </div>
            </div>

            <div className="container-main mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-mono font-light text-slate-500 uppercase tracking-widest">
                <p>© {new Date().getFullYear()} ОРИЕНТ ЭКСПРЕСС. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link to="/privacy" className="hover:text-slate-300 transition-colors">Политика конфиденциальности</Link>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
