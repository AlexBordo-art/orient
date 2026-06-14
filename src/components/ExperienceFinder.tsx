import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Landmark, SunMoon, Users, Briefcase, GraduationCap } from 'lucide-react';

const FeelingIcon: React.FC<{ id: string; className?: string }> = ({ id, className }) => {
    switch (id) {
        case 'adventure':
            return <Mountain className={className} />;
        case 'culture':
            return <Landmark className={className} />;
        case 'romance':
            return <SunMoon className={className} />;
        case 'family':
            return <Users className={className} />;
        case 'business':
            return <Briefcase className={className} />;
        case 'education':
            return <GraduationCap className={className} />;
        default:
            return null;
    }
};

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
                <Link to="/tours" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border-2 border-t-strong/60 text-t-strong font-mono text-xs uppercase tracking-[0.15em] font-bold hover:bg-t-strong hover:text-t-bg transition-all duration-300 mt-4 md:mt-0 group">
                    Все направления
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
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
                        <FeelingIcon id={f.id} className="w-4 h-4 shrink-0" />
                        <span>{f.label}</span>
                    </button>
                ))}
            </div>

            {/* Destination cards — center (i===1) always featured */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {(destinations ?? [
                    { name: 'Токио', tag: 'TKY-01', img: images[0], desc: 'Визы за 4 дня. Культура, технологии, гастрономия.', link: '/tours' },
                    { name: 'Дубай', tag: 'DXB-07', img: images[1], desc: 'Резидентские визы. Роскошь без компромиссов.', link: '/tours' },
                    { name: 'Рим', tag: 'ROM-04', img: images[2], desc: 'Шенген. Вечный город, архитектура, история.', link: '/tours' },
                ]).map((card, i) => {
                    const featured = i === 1;
                    return (
                        <div
                            key={i}
                            className={`glass-card p-4 rounded-xl shadow-2xl bg-t-card backdrop-blur border group flex flex-col transition-all duration-500 transform-gpu ${featured ? 'border-champagne/30 md:-translate-y-4' : 'border-t-border hover:border-white/30'}`}
                        >
                            <div className="relative w-full h-[22vh] overflow-hidden rounded-lg mb-4">
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" src={card.img} alt={card.name} />
                                <div className="absolute bottom-3 left-3 font-mono text-[9px] bg-black/60 backdrop-blur px-2 py-1 rounded tracking-[0.2em] text-t-strong border border-champagne/20">{card.tag}</div>
                                {featured && <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-t-strong shadow-[0_0_15px_rgba(247,231,206,0.8)] animate-pulse" />}
                            </div>
                            <h3 className={`font-heading text-2xl mb-2 ${featured ? 'text-t-strong' : 'text-t-text'}`}>{card.name}</h3>
                            <p className="font-sans text-xs text-t-text/50 leading-relaxed flex-grow mb-4">{'desc' in card ? card.desc : card.country}</p>
                            <button
                                onClick={onOpenModal}
                                className={`btn-card ${featured ? 'btn-card-primary' : 'btn-card-secondary'}`}
                            >
                                {featured ? 'Рассчитать тур' : 'Подробнее'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExperienceFinder;
