import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { Clock, CheckCircle, FileText, Shield } from 'lucide-react';

// Visa data — will be expanded later with full content from Phase 4
const VISA_DATA: Record<string, { name: string; icon: string; types: { name: string; desc: string }[] }> = {
    china: {
        name: 'Китай', icon: '🇨🇳',
        types: [
            { name: 'Туристическая виза (L)', desc: 'Для индивидуальных путешественников. Срок рассмотрения: 5-7 рабочих дней.' },
            { name: 'Деловая виза (M)', desc: 'Для деловых встреч и коммерческой деятельности.' },
            { name: 'Групповая виза', desc: 'Для организованных туристических групп от 5 человек.' },
        ],
    },
    korea: {
        name: 'Южная Корея', icon: '🇰🇷',
        types: [
            { name: 'K-ETA', desc: 'Электронное разрешение для безвизового въезда.' },
            { name: 'Деловая виза (C-3-4)', desc: 'Для деловых поездок с номером подтверждения.' },
            { name: 'Этническая виза (F-4)', desc: 'Для лиц корейского происхождения.' },
            { name: 'Учебная виза (D-2)', desc: 'Для обучения в корейских вузах.' },
        ],
    },
    thailand: {
        name: 'Таиланд', icon: '🇹🇭',
        types: [
            { name: 'Туристическая (TR)', desc: 'Однократная туристическая виза.' },
            { name: 'Многократная (TR-2)', desc: 'Многократный въезд для частых посетителей.' },
            { name: 'Пенсионная (O-A)', desc: 'Для пенсионеров старше 50 лет.' },
            { name: 'Digital Nomad (DTV)', desc: 'Виза цифрового кочевника для удалённых работников.' },
        ],
    },
    schengen: {
        name: 'Шенгенская зона', icon: '🇪🇺',
        types: [
            { name: 'Туристическая виза (C)', desc: 'Единая шенгенская виза для 27 стран Европы.' },
        ],
    },
    singapore: { name: 'Сингапур', icon: '🇸🇬', types: [{ name: 'eVisa', desc: 'Электронная туристическая виза.' }] },
    india: { name: 'Индия', icon: '🇮🇳', types: [{ name: 'ETA', desc: 'Электронное разрешение на въезд.' }] },
    bulgaria: {
        name: 'Болгария', icon: '🇧🇬',
        types: [
            { name: 'Туристическая (C)', desc: 'Краткосрочная виза для туризма.' },
            { name: 'Гостевая (C)', desc: 'По приглашению от граждан Болгарии.' },
            { name: 'Долгосрочная (D)', desc: 'Для длительного пребывания.' },
        ],
    },
    cyprus: {
        name: 'Кипр', icon: '🇨🇾',
        types: [
            { name: 'Национальная (C)', desc: 'Стандартная туристическая виза.' },
            { name: 'По недвижимости (C)', desc: 'На основании владения недвижимостью.' },
            { name: 'Гостевая (C)', desc: 'По приглашению.' },
        ],
    },
};

const VisaPage: React.FC = () => {
    const { country } = useParams<{ country: string }>();
    const visa = country ? VISA_DATA[country] : null;

    if (!visa) {
        return (
            <div className="min-h-screen bg-obsidian flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl text-white font-bold mb-4">Страна не найдена</h1>
                    <Link to="/visas" className="text-champagne hover:underline">← Вернуться в Визовый Центр</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-obsidian">
            <Breadcrumbs />
            <div className="max-w-5xl mx-auto px-6 pb-20">
                {/* Page Header */}
                <div className="mb-12">
                    <div className="text-6xl mb-4">{visa.icon}</div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
                        Визы в {visa.name}
                    </h1>
                    <p className="text-slate-400 text-lg max-w-xl">
                        Полный комплекс услуг: консультация, сбор документов, подача заявки и сопровождение до получения визы.
                    </p>
                </div>

                {/* Visa Types */}
                <div className="space-y-4 mb-16">
                    {visa.types.map((type, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-champagne/15 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-white font-semibold text-lg mb-1">{type.name}</h3>
                                    <p className="text-slate-400 text-sm">{type.desc}</p>
                                </div>
                                <button className="shrink-0 px-5 py-2.5 rounded-xl bg-champagne/10 text-champagne text-sm font-medium hover:bg-champagne/20 transition-colors border border-champagne/20">
                                    Оформить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Process Steps */}
                <div className="mb-16">
                    <h2 className="text-2xl font-heading font-bold text-white mb-8">Как мы работаем</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { icon: <FileText size={20} />, title: 'Консультация', desc: 'Бесплатно определим тип визы и перечень документов' },
                            { icon: <CheckCircle size={20} />, title: 'Подготовка', desc: 'Собираем и проверяем пакет документов' },
                            { icon: <Clock size={20} />, title: 'Подача', desc: 'Подаём заявку и отслеживаем статус' },
                            { icon: <Shield size={20} />, title: 'Получение', desc: 'Выдаём паспорт с визой лично или курьером' },
                        ].map((step, i) => (
                            <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                                <div className="text-champagne mb-3">{step.icon}</div>
                                <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-10 rounded-2xl border border-champagne/10 bg-champagne/[0.03]">
                    <h2 className="text-2xl font-heading font-bold text-white mb-3">Готовы оформить визу?</h2>
                    <p className="text-slate-400 mb-6">Бесплатная консультация — ответим за 15 минут в рабочее время</p>
                    <button className="px-8 py-3.5 rounded-xl bg-champagne text-obsidian font-semibold text-sm hover:scale-105 transition-transform">
                        Получить консультацию
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VisaPage;
