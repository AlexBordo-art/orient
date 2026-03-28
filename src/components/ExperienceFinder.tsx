import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FEELINGS = [
    { id: 'adventure', label: 'Приключение', genitive: 'приключений', icon: 'terrain', desc: 'Горы, экспедиции, активный отдых' },
    { id: 'culture', label: 'Культура', genitive: 'культуры', icon: 'account_balance', desc: 'История, музеи, гастрономия' },
    { id: 'romance', label: 'Романтика', genitive: 'романтики', icon: 'wb_twilight', desc: 'Для двоих, медовый месяц' },
    { id: 'family', label: 'Семья', genitive: 'семьи', icon: 'family_restroom', desc: 'Безопасно, комфортно, интересно детям' },
    { id: 'business', label: 'Бизнес', genitive: 'бизнеса', icon: 'work', desc: 'Деловые визы, релокация, рабочие поездки' },
    { id: 'education', label: 'Образование', genitive: 'образования', icon: 'school', desc: 'Университеты, языковые школы, стажировки' },
];

const DESTINATIONS: Record<string, { name: string; country: string; img: string; tag: string; link: string }[]> = {
    adventure: [
        { name: 'Камчатка', country: 'Россия', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=600', tag: 'Вулканы · Гейзеры', link: '/tours' },
        { name: 'Непал', country: 'Южная Азия', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600', tag: 'Треккинг · Эверест', link: '/tours' },
        { name: 'Монголия', country: 'Центральная Азия', img: 'https://images.unsplash.com/photo-1599408997521-5196e7741122?auto=format&fit=crop&q=80&w=600', tag: 'Степи · Кочевники', link: '/tours' },
    ],
    culture: [
        { name: 'Токио', country: 'Япония', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600', tag: 'Технологии · Традиции', link: '/tours' },
        { name: 'Пекин', country: 'Китай', img: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=600', tag: 'История · Кухня', link: '/tours' },
        { name: 'Сеул', country: 'Корея', img: 'https://images.unsplash.com/photo-1617541086271-8f6e24c5e9ee?auto=format&fit=crop&q=80&w=600', tag: 'K-Culture · Дизайн', link: '/tours' },
    ],
    romance: [
        { name: 'Бали', country: 'Индонезия', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', tag: 'Рисовые поля · Закаты', link: '/tours' },
        { name: 'Дубай', country: 'ОАЭ', img: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80&w=600', tag: 'Роскошь · Пустыня', link: '/tours' },
        { name: 'Мальдивы', country: 'Индийский океан', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600', tag: 'Виллы · Океан', link: '/tours' },
    ],
    family: [
        { name: 'Таиланд', country: 'Азия', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=600', tag: 'Безопасно · Доступно', link: '/tours' },
        { name: 'Хайнань', country: 'Китай', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=600', tag: 'Пляж · Инфраструктура', link: '/tours' },
        { name: 'Байкал', country: 'Россия', img: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=600', tag: 'Природа · Экология', link: '/tours' },
    ],
    business: [
        { name: 'Гонконг', country: 'Китай', img: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&q=80&w=600', tag: 'Финансы · Логистика', link: '/visa' },
        { name: 'Шанхай', country: 'Китай', img: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&q=80&w=600', tag: 'Бизнес · Торговля', link: '/visa' },
        { name: 'Сингапур', country: 'Азия', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=600', tag: 'Хаб · Релокация', link: '/visa' },
    ],
    education: [
        { name: 'Пекин', country: 'Китай', img: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=600', tag: 'Университеты · Язык', link: '/education' },
        { name: 'Сеул', country: 'Корея', img: 'https://images.unsplash.com/photo-1617541086271-8f6e24c5e9ee?auto=format&fit=crop&q=80&w=600', tag: 'K-University · Гранты', link: '/education' },
        { name: 'Берлин', country: 'Германия', img: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=600', tag: 'Бесплатное образование', link: '/education' },
    ],
};

interface ExperienceFinderProps {
    images: string[];
    onOpenModal: () => void;
}

const ExperienceFinder: React.FC<ExperienceFinderProps> = ({ images, onOpenModal }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const destinations = selected ? DESTINATIONS[selected] : null;

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col h-full justify-center">
            {/* Header */}
            <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                    <span className="font-mono text-t-strong/70 text-[10px] tracking-[0.3em] uppercase block mb-2">Глобальная сеть</span>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-t-text font-light tracking-tight">
                        {selected
                            ? <>Маршруты для <span className="text-t-strong italic">{FEELINGS.find(f => f.id === selected)?.genitive}</span></>
                            : <>Как вы хотите <span className="text-t-text/90">путешествовать?</span></>
                        }
                    </h2>
                </div>
                <Link to="/tours" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-t-strong/30 bg-t-strong/8 hover:border-t-strong/60 hover:bg-t-strong/15 transition-all duration-300 text-xs font-mono uppercase tracking-[0.15em] text-t-strong hover:text-t-strong mt-4 md:mt-0">
                    Все направления <span className="ml-0.5">→</span>
                </Link>
            </div>

            {/* Feeling pills */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                {FEELINGS.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setSelected(selected === f.id ? null : f.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono tracking-wide transition-all duration-300 ${
                            selected === f.id
                                ? 'bg-t-strong text-t-bg border-champagne shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                : 'bg-t-glass border-t-border text-t-text/70 hover:border-champagne/40 hover:text-t-text'
                        }`}
                    >
                        <span className="material-symbols-outlined text-base leading-none">{f.icon}</span>
                        <span>{f.label}</span>
                    </button>
                ))}
            </div>

            {/* Destination cards */}
            {destinations ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {destinations.map((dest, i) => (
                        <Link
                            key={i}
                            to={dest.link}
                            className="glass-card rounded-xl overflow-hidden bg-t-card backdrop-blur border border-t-border hover:border-champagne/30 transition-all duration-500 group flex flex-col"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="relative h-36 md:h-44 overflow-hidden">
                                <img
                                    src={dest.img}
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-dark/80 to-transparent" />
                                <span className="absolute bottom-3 left-3 font-mono text-[9px] bg-black/60 backdrop-blur px-2 py-1 rounded tracking-[0.2em] text-t-strong border border-champagne/20">
                                    {dest.tag}
                                </span>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-heading text-lg text-t-text">{dest.name}</h3>
                                    <p className="text-t-text/40 text-xs">{dest.country}</p>
                                </div>
                                <span className="text-t-strong text-lg group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                /* Default: 3 featured cards when nothing selected */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {[
                        { name: 'Токио', tag: 'TKY-01', img: images[0], desc: 'Визы за 4 дня. Культура, технологии, гастрономия.' },
                        { name: 'Дубай', tag: 'DXB-07', img: images[1], desc: 'Резидентские визы. Роскошь без компромиссов.' },
                        { name: 'Рим', tag: 'ROM-04', img: images[2], desc: 'Шенген. Вечный город, архитектура, история.' },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className={`glass-card p-4 rounded-xl shadow-2xl bg-t-card backdrop-blur border group flex flex-col hover:border-white/30 transition-colors duration-500 transform-gpu ${i === 1 ? 'border-champagne/30 md:-translate-y-4' : 'border-t-border'}`}
                        >
                            <div className="relative w-full h-[22vh] overflow-hidden rounded-lg mb-4">
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" src={card.img} alt={card.name} />
                                <div className="absolute bottom-3 left-3 font-mono text-[9px] bg-black/60 backdrop-blur px-2 py-1 rounded tracking-[0.2em] text-t-strong border border-champagne/20">{card.tag}</div>
                                {i === 1 && <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-t-strong shadow-[0_0_15px_rgba(247,231,206,0.8)] animate-pulse"></div>}
                            </div>
                            <h3 className={`font-heading text-2xl mb-2 ${i === 1 ? 'text-t-strong' : 'text-t-text'}`}>{card.name}</h3>
                            <p className="font-sans text-xs text-t-text/50 leading-relaxed flex-grow mb-4">{card.desc}</p>
                            <button
                                onClick={onOpenModal}
                                className={`w-full py-2 rounded text-[10px] font-mono tracking-widest uppercase transition-colors ${i === 1 ? 'bg-t-strong hover:bg-t-strong-light text-t-bg font-bold' : 'bg-t-glass hover:bg-white/10 border border-t-border text-t-text'}`}
                            >
                                {i === 1 ? 'Рассчитать тур' : 'Подробнее'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExperienceFinder;
