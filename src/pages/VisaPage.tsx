import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { ModalContext } from '../layouts/RootLayout';
import { Clock, CheckCircle, FileText, Shield, ChevronDown, MapPin } from 'lucide-react';

import { GHOST, VISA_DATA, CHINA_CITIES_DATA } from '../data/visas';

const FAQ_ITEMS = [
    {
        q: 'Сколько стоит оформление визы?',
        a: 'Стоимость состоит из консульского сбора и наших услуг по подготовке документов. В тарифах указана конечная стоимость «под ключ». Консультация всегда бесплатна — мы рассчитаем точную сумму под вашу задачу за 15 минут.'
    },
    {
        q: 'Что произойдет в случае отказа в визе?',
        a: 'Мы полностью уверены в качестве своей работы, поэтому предоставляем финансовую гарантию: в случае отказа мы возвращаем полную стоимость наших услуг. Консульский сбор удерживается самим посольством и возврату не подлежит.'
    },
    {
        q: 'Какие документы нужны от меня?',
        a: 'Для большинства стран (особенно для K-ETA в Корею или визы Китая) от вас потребуется только качественное фото первой страницы загранпаспорта и ваше фото на белом фоне. Сбор всех остальных справок, заполнение анкет на иностранном языке и переводы мы берем на себя.'
    },
    {
        q: 'Нужно ли мне лично ехать в консульство?',
        a: 'В большинство стран (Китай, Корея, Сингапур, Индия) мы подаем документы без вашего присутствия. Личный визит требуется только для сдачи биометрии (например, при оформлении шенгенской визы, если вы не сдавали отпечатки пальцев за последние 5 лет).'
    },
    {
        q: 'Почему стоит оформить визу у вас, а не самостоятельно?',
        a: 'Самостоятельная подача связана с рисками совершить ошибку в анкетах, предоставить неполный пакет документов или получить отказ, который испортит визовую историю. Мы проверяем все анкеты вручную, имеем опыт работы с 2007 года и берем на себя всю рутину, экономя вам до 10 часов времени.'
    },
];

const FaqItem: React.FC<{ item: typeof FAQ_ITEMS[0] }> = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-t-border rounded-xl overflow-hidden bg-t-card/40 backdrop-blur-sm">
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-t-card transition-colors"
            >
                <span className="text-t-text font-medium text-sm pr-4">{item.q}</span>
                <ChevronDown size={18} className={`text-t-strong shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-5 pb-5">
                    <p className="text-t-muted text-sm leading-relaxed font-sans font-light">{item.a}</p>
                </div>
            )}
        </div>
    );
};

const VisaPage: React.FC = () => {
    const { country } = useParams<{ country: string }>();
    const { openLeadModal } = useContext(ModalContext);
    const [selectedCity, setSelectedCity] = useState<'khv' | 'vlad' | 'msk' | 'spb'>('khv');

    const visa = country ? VISA_DATA[country] : null;

    if (!visa) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl text-t-text font-bold mb-4">Страна не найдена</h1>
                    <Link to="/visas" className="text-t-strong hover:underline">← Вернуться в Визовый Центр</Link>
                </div>
            </div>
        );
    }

    const isChina = country === 'china';
    const activeDescription = isChina ? CHINA_CITIES_DATA[selectedCity].description : visa.description;
    const activeTypes = isChina ? CHINA_CITIES_DATA[selectedCity].types : visa.types;

    return (
        <div className="min-h-screen bg-transparent">
            <SEO
                title={`Виза в ${visa.name} — оформление под ключ`}
                description={activeDescription}
                canonical={`/visas/${country}`}
                keywords={`виза в ${visa.name}, оформление визы ${visa.name}, ${visa.name} виза стоимость`}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": `Оформление визы в ${visa.name}`,
                    "provider": { "@type": "Organization", "name": "Ориент Экспресс" },
                    "areaServed": visa.name,
                    "serviceType": "Visa Processing"
                }}
            />
            <Breadcrumbs />
            <div className="max-w-5xl mx-auto px-6 pb-20">
                {/* Page Header with ghost watermark */}
                <div className="mb-12 relative">
                    <span
                        aria-hidden="true"
                        className="absolute font-heading select-none pointer-events-none"
                        style={{
                            right: '-0.05em',
                            top: '-0.25em',
                            fontSize: '20rem',
                            lineHeight: 1,
                            color: 'var(--color-accent-strong)',
                            opacity: 0.07,
                            fontWeight: 400,
                        }}
                    >
                        {GHOST[country!] ?? ''}
                    </span>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-3xl">{visa.icon}</span>
                            <span className="text-t-accent text-xs font-mono tracking-widest uppercase opacity-60">Визовый центр</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-t-text mb-4 tracking-tight leading-tight">
                            Визы в {visa.name}
                        </h1>
                        <p className="text-t-muted text-base max-w-2xl leading-relaxed">
                            {activeDescription}
                        </p>
                    </div>
                </div>

                {/* City Selector for China */}
                {isChina && (
                    <div className="mb-10 bg-t-card border border-t-border rounded-2xl p-6">
                        <span className="font-mono text-t-text/50 text-[10px] tracking-widest uppercase block mb-3 flex items-center gap-1.5">
                            <MapPin size={12} className="text-t-strong/60" /> Город (округ) подачи документов
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {(Object.keys(CHINA_CITIES_DATA) as Array<keyof typeof CHINA_CITIES_DATA>).map(cityKey => (
                                <button
                                    key={cityKey}
                                    onClick={() => setSelectedCity(cityKey as 'khv' | 'vlad' | 'msk' | 'spb')}
                                    className={`px-4 py-3 rounded-xl border text-xs font-mono tracking-wide transition-all duration-300 ${
                                        selectedCity === cityKey
                                            ? 'bg-t-strong text-t-bg border-champagne shadow-[0_0_15px_rgba(212,175,55,0.25)] font-bold'
                                            : 'bg-t-glass border-t-border text-t-text/70 hover:border-champagne/40 hover:text-t-text'
                                    }`}
                                >
                                    {CHINA_CITIES_DATA[cityKey].cityName}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Visa Types */}
                <div className="space-y-4 mb-16">
                    <h2 className="text-xl font-heading font-bold text-t-text mb-4">Доступные тарифы</h2>
                    {activeTypes.map((type, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl border border-t-border bg-t-card hover:bg-t-card hover:border-t-strong/20 transition-all duration-500 shadow-lg"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="max-w-xl">
                                    <h3 className="text-t-text font-heading font-medium text-xl mb-1.5">{type.name}</h3>
                                    <p className="text-t-muted text-sm font-sans font-light leading-relaxed mb-3">{type.desc}</p>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-t-strong/80 uppercase tracking-wider">
                                        <Clock size={12} />
                                        <span>Срок: {type.time}</span>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-3 shrink-0 border-t sm:border-t-0 border-t-border pt-4 sm:pt-0">
                                    <div className="text-xl font-heading font-bold text-t-text sm:text-right">
                                        {type.price}
                                    </div>
                                    <button
                                        onClick={openLeadModal}
                                        className="btn-card btn-card-primary !px-6 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase"
                                    >
                                        Оформить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Process Steps */}
                <div className="mb-16">
                    <h2 className="text-2xl font-heading font-light text-t-text mb-8 tracking-tight">Как мы работаем</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <FileText size={20} />, step: '01', title: 'Консультация', desc: 'Бесплатно оцениваем шансы, выбираем тип визы и формируем список документов.' },
                            { icon: <CheckCircle size={20} />, step: '02', title: 'Подготовка', desc: 'Заполняем анкеты, делаем переводы и бронируем отели/билеты.' },
                            { icon: <Clock size={20} />, step: '03', title: 'Подача', desc: 'Подаем документы в консульство без вашего присутствия (где применимо).' },
                            { icon: <Shield size={20} />, step: '04', title: 'Получение', desc: 'Забираете готовый паспорт с визой в нашем офисе или доставим курьером.' },
                        ].map((step, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-t-border bg-t-card relative shadow-md">
                                <span className="absolute top-4 right-4 text-t-strong/20 font-mono text-xl font-bold">{step.step}</span>
                                <div className="text-t-strong mb-4">{step.icon}</div>
                                <h4 className="text-t-text font-heading font-medium text-sm mb-2">{step.step}. {step.title}</h4>
                                <p className="text-t-subtle text-xs leading-relaxed font-sans font-light">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="mb-16">
                    <h2 className="text-2xl font-heading font-light text-t-text mb-8 tracking-tight">Частые вопросы</h2>
                    <div className="space-y-3">
                        {FAQ_ITEMS.map((item, i) => (
                            <FaqItem key={i} item={item} />
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center p-8 md:p-12 rounded-2xl border border-t-strong/10 bg-t-strong/[0.02] backdrop-blur-sm relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-t-strong/60" />
                    <h2 className="text-3xl font-heading font-bold text-t-text mb-3 tracking-tight">Готовы оформить визу?</h2>
                    <p className="text-t-muted mb-8 text-sm max-w-md mx-auto">
                        Начните с бесплатной консультации — мы проверим ваши документы и ответим на все вопросы в течение 15 минут.
                    </p>

                    <button
                        onClick={openLeadModal}
                        className="btn-premium !py-4 !px-10 text-xs font-mono tracking-widest uppercase mb-6"
                    >
                        Получить консультацию
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-t-subtle font-sans font-light">
                        <span className="flex items-center gap-1.5">
                            <Shield size={14} className="text-t-strong/70" />
                            Возврат денег при отказе
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-t-text/15"></span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-t-strong/70" />
                            Проверка анкет вручную
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaPage;
