import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { ModalContext } from '../layouts/RootLayout';
import { Clock, CheckCircle, FileText, Shield, ChevronDown, MapPin } from 'lucide-react';

const GHOST: Record<string, string> = {
    china: '中', korea: '韓', thailand: 'ไ', schengen: 'E',
    singapore: '星', india: 'भ', bulgaria: 'Б', cyprus: 'Κ',
};

interface VisaType {
    name: string;
    desc: string;
    price: string;
    time: string;
}

// Visa data with prices and processing times
const VISA_DATA: Record<string, { name: string; icon: string; description: string; types: VisaType[] }> = {
    china: {
        name: 'Китай', icon: '🇨🇳',
        description: 'Оформление всех типов виз в Китай. Требования, сроки и стоимость зависят от выбранного города подачи (консульского округа). Выберите ваш город ниже.',
        types: [] // Populated dynamically based on city selection
    },
    korea: {
        name: 'Южная Корея', icon: '🇰🇷',
        description: 'Электронные разрешения K-ETA и консульские визы для туризма, учебы и работы. 98% одобрений по K-ETA благодаря ручной проверке анкет.',
        types: [
            { name: 'K-ETA (Электронное разрешение)', desc: 'Для безвизового въезда с туристическими целями на срок до 60 дней.', price: '3 500 ₽', time: '1–2 рабочих дня' },
            { name: 'Деловая виза (C-3-4)', desc: 'Для деловых встреч и коммерческой деятельности при наличии приглашения.', price: 'от 12 000 ₽', time: '5–7 рабочих дней' },
            { name: 'Этническая виза (F-4)', desc: 'Для лиц корейского происхождения (до 3-го поколения включительно).', price: 'от 15 000 ₽', time: '10–14 рабочих дней' },
            { name: 'Учебная виза (D-2 / D-4)', desc: 'Для студентов языковых курсов и программ бакалавриата/магистратуры.', price: 'от 10 000 ₽', time: '7–10 рабочих дней' },
        ],
    },
    thailand: {
        name: 'Таиланд', icon: '🇹🇭',
        description: 'Однократные и многократные туристические визы, пенсионные программы и новые визы для цифровых кочевников (DTV).',
        types: [
            { name: 'Туристическая виза (TR)', desc: 'Дает право находиться в стране до 60 дней с возможностью продления еще на 30 дней.', price: '8 500 ₽', time: '5–7 рабочих дней' },
            { name: 'Многократная туристическая виза (METV)', desc: 'Действует 6 месяцев, позволяет въезжать неограниченное число раз.', price: '22 000 ₽', time: '7–10 рабочих дней' },
            { name: 'Пенсионная виза (Non-Immigrant O-A)', desc: 'Для долгосрочного пребывания граждан старше 50 лет.', price: '28 000 ₽', time: '10–14 рабочих дней' },
            { name: 'Digital Nomad (DTV)', desc: 'Новая виза цифрового кочевника для удаленных специалистов сроком на 5 лет.', price: '38 000 ₽', time: '7–10 рабочих дней' },
        ],
    },
    schengen: {
        name: 'Шенгенская зона', icon: '🇪🇺',
        description: 'Оформление виз через дружественные консульства (Италия, Испания, Франция, Венгрия). Помогаем с записью и готовим идеальный пакет документов.',
        types: [
            { name: 'Туристическая виза (C)', desc: 'Краткосрочная виза для туризма или посещения близких. Консульский сбор оплачивается отдельно.', price: 'от 14 000 ₽', time: '15–30 рабочих дней' }
        ],
    },
    singapore: {
        name: 'Сингапур', icon: '🇸🇬',
        description: 'Оформление электронных виз в Сингапур для граждан РФ и СНГ. Без личного присутствия и визитов в посольство.',
        types: [
            { name: 'Электронная виза (eVisa)', desc: 'Оформляется в виде электронного письма с баркодом. Необходима бронь отеля и билет.', price: '6 500 ₽', time: '3–4 рабочих дня' }
        ]
    },
    india: {
        name: 'Индия', icon: '🇮🇳',
        description: 'Быстрое электронное разрешение на въезд в Индию для туризма, йога-туров и деловых поездок.',
        types: [
            { name: 'Электронная виза (e-Visa)', desc: 'Однократная или многократная виза на срок от 30 дней до 5 лет.', price: 'от 5 500 ₽', time: '3–4 рабочих дня' }
        ]
    },
    bulgaria: {
        name: 'Болгария', icon: '🇧🇬',
        description: 'Национальные болгарские визы. Подача без личного присутствия, подходит для транзита и отдыха.',
        types: [
            { name: 'Туристическая виза (C)', desc: 'Для краткосрочных поездок. Требуется подтверждение проживания.', price: '9 500 ₽', time: '10–15 рабочих дней' },
            { name: 'Гостевая виза (C)', desc: 'При наличии нотариального приглашения от гражданина Болгарии.', price: '11 000 ₽', time: '10–15 рабочих дней' }
        ],
    },
    cyprus: {
        name: 'Кипр', icon: '🇨🇾',
        description: 'Оформление кипрских национальных виз взамен ранее действовавших провиз.',
        types: [
            { name: 'Национальная виза (C)', desc: 'Туристическая виза, вклеиваемая в заграничный паспорт.', price: '8 500 ₽', time: '5–7 рабочих дней' }
        ],
    },
};

// China city submission configurations (legacy content migration)
const CHINA_CITIES_DATA: Record<string, {cityName: string; description: string; types: VisaType[]}> = {
    khv: {
        cityName: 'Хабаровск',
        description: 'Подача документов осуществляется в Генеральное консульство КНР в Хабаровске. Подходит для жителей Хабаровского края, Амурской области и ЕАО.',
        types: [
            { name: 'Туристическая виза (L) — Однократная', desc: 'Для поездок до 30 дней. Подача по записи без собеседования.', price: '9 000 ₽', time: '5–7 рабочих дней' },
            { name: 'Двукратная виза (L/M)', desc: 'Позволяет въехать в Китай дважды в течение 90 дней.', price: '14 000 ₽', time: '5–7 рабочих дней' },
            { name: 'Групповой список (от 5 человек)', desc: 'Безвизовый въезд для туристических групп. Паспорт сдавать не нужно.', price: '2 500 ₽', time: '2–3 рабочих дня' },
            { name: 'Деловая виза (M) — Многократная', desc: 'Бизнес-виза на 1 год для регулярных коммерческих визитов.', price: '26 000 ₽', time: '7–10 рабочих дней' }
        ]
    },
    vlad: {
        cityName: 'Владивосток',
        description: 'Подача в Генеральное консульство КНР во Владивостоке. Подходит для жителей Приморского края и Сахалина.',
        types: [
            { name: 'Туристическая виза (L) — Однократная', desc: 'Стандартная однократная виза. Требуется бронь отеля.', price: '9 000 ₽', time: '5–7 рабочих дней' },
            { name: 'Двукратная виза (L/M)', desc: 'Два въезда в Китай с коридором пребывания до 30 дней на каждый въезд.', price: '14 000 ₽', time: '5–7 рабочих дней' },
            { name: 'Групповой список (от 5 человек)', desc: 'Для безвизового пересечения границы в составе организованной группы.', price: '2 500 ₽', time: '2–3 рабочих дня' }
        ]
    },
    msk: {
        cityName: 'Москва',
        description: 'Подача документов в Посольство КНР в Москве (через Китайский визовый центр). Обслуживает жителей Центрального и Южного федеральных округов.',
        types: [
            { name: 'Туристическая виза (L) — Однократная', desc: 'Стандартный въезд. Требуется полный пакет документов и страховка.', price: '7 000 ₽', time: '5–7 рабочих дней' },
            { name: 'Туристическая виза (L) — Двукратная', desc: 'Для двух поездок в Китай. Требуются билеты на оба въезда.', price: '11 000 ₽', time: '5–7 рабочих дней' },
            { name: 'Деловая виза (M) — Однократная', desc: 'Для деловых поездок при наличии официального приглашения от компании из КНР.', price: '9 500 ₽', time: '5–7 рабочих дней' },
            { name: 'Деловая виза (M) — Многократная', desc: 'Многократная бизнес-виза на 1 год. Требуется годовое приглашение.', price: '23 000 ₽', time: '7–10 рабочих дней' }
        ]
    },
    spb: {
        cityName: 'Санкт-Петербург',
        description: 'Подача в Генеральное консульство КНР в Санкт-Петербурге. Для жителей Ленинградской, Мурманской, Новгородской и Псковской областей.',
        types: [
            { name: 'Туристическая виза (L) — Однократная', desc: 'Индивидуальный туризм. Требуется подтверждение занятости.', price: '8 500 ₽', time: '5–7 рабочих дней' },
            { name: 'Деловая виза (M) — Однократная', desc: 'Бизнес-визиты по официальному приглашению.', price: '11 000 ₽', time: '5–7 рабочих дней' }
        ]
    }
};

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
                                    onClick={() => setSelectedCity(cityKey)}
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
