import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { Clock, CheckCircle, FileText, Shield, ChevronDown, MessageCircle, Star } from 'lucide-react';

// Visa data
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
        types: [{ name: 'Туристическая виза (C)', desc: 'Единая шенгенская виза для 27 стран Европы.' }],
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

// FAQ — Objection Handling (5 Universal Objections)
const FAQ_ITEMS = [
    {
        q: 'Сколько стоит оформление визы?',
        a: 'Стоимость зависит от страны и типа визы. Консультация бесплатна — мы просчитаем точную стоимость в течение 15 минут. Визы «под ключ» начинаются от 3 000 ₽.'
    },
    {
        q: 'Что будет, если мне откажут в визе?',
        a: 'За 12 лет работы наш процент одобрений — 99.8%. Но если отказ всё же произойдёт, мы вернём стоимость наших услуг. Консульский сбор не возвращается по правилам консульства.'
    },
    {
        q: 'Насколько сложно всё оформить?',
        a: 'С нашей стороны — ничего сложного. Вы предоставляете паспорт и базовые данные, мы делаем всё остальное: анкеты, переводы, запись, подачу. Среднее время оформления: 5-7 рабочих дней.'
    },
    {
        q: 'Могу ли я отслеживать статус моей визы?',
        a: 'Да. Мы уведомляем вас на каждом этапе: приём документов → подача → рассмотрение → готово. Персональный менеджер доступен по телефону и мессенджерам.'
    },
    {
        q: 'Почему стоит обратиться к вам, а не оформить самостоятельно?',
        a: 'Самостоятельное оформление — это часы в очередях, риск ошибок в анкетах и неполного пакета документов. Одна ошибка = отказ. Мы снимаем все эти риски и экономим ваше время. Средний клиент экономит 8+ часов.'
    },
];

const FaqItem: React.FC<{ item: typeof FAQ_ITEMS[0] }> = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-t-border rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-t-card transition-colors"
            >
                <span className="text-t-text font-medium text-sm pr-4">{item.q}</span>
                <ChevronDown size={18} className={`text-t-strong shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-5 pb-5">
                    <p className="text-t-muted text-sm leading-relaxed">{item.a}</p>
                </div>
            )}
        </div>
    );
};

const VisaPage: React.FC = () => {
    const { country } = useParams<{ country: string }>();
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

    return (
        <div className="min-h-screen">
            <SEO
                title={`Виза в ${visa.name} — оформление под ключ`}
                description={`Оформление визы в ${visa.name}: ${visa.types.map(t => t.name).join(', ')}. 99.8% одобрений, оформление за 5-7 дней. Бесплатная консультация.`}
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
                {/* Page Header */}
                <div className="mb-12">
                    <div className="text-6xl mb-4">{visa.icon}</div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-t-text mb-4 tracking-tight">
                        Визы в {visa.name}
                    </h1>
                    <p className="text-t-muted text-lg max-w-xl">
                        Полный комплекс услуг: консультация, сбор документов, подача заявки и сопровождение до получения визы.
                    </p>
                </div>

                {/* Trust Cascade — Step 3: Credibility Trust (Social Proof) */}
                <div className="flex flex-wrap gap-6 mb-12 p-5 rounded-xl border border-t-border bg-t-card">
                    <div className="flex items-center gap-2">
                        <Shield size={16} className="text-t-strong" />
                        <span className="text-t-muted text-sm">99.8% одобрений</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-t-strong" />
                        <span className="text-t-muted text-sm">5-7 дней оформление</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star size={16} className="text-t-strong" />
                        <span className="text-t-muted text-sm">12+ лет экспертизы</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-t-strong" />
                        <span className="text-t-muted text-sm">Персональный менеджер</span>
                    </div>
                </div>

                {/* Visa Types */}
                <div className="space-y-4 mb-16">
                    <h2 className="text-xl font-heading font-bold text-t-text mb-4">Типы виз</h2>
                    {visa.types.map((type, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl border border-t-border bg-t-card hover:bg-t-card hover:border-t-strong/15 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-t-text font-semibold text-lg mb-1">{type.name}</h3>
                                    <p className="text-t-muted text-sm">{type.desc}</p>
                                </div>
                                <button className="shrink-0 px-5 py-2.5 rounded-xl bg-t-strong/10 text-t-strong text-sm font-medium hover:bg-t-strong/20 transition-colors border border-t-strong/20">
                                    Оформить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Process Steps — Reduces "complexity" objection */}
                <div className="mb-16">
                    <h2 className="text-2xl font-heading font-bold text-t-text mb-8">Как мы работаем</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { icon: <FileText size={20} />, step: '01', title: 'Консультация', desc: 'Бесплатно определим тип визы и перечень документов' },
                            { icon: <CheckCircle size={20} />, step: '02', title: 'Подготовка', desc: 'Собираем и проверяем пакет документов' },
                            { icon: <Clock size={20} />, step: '03', title: 'Подача', desc: 'Подаём заявку и отслеживаем статус' },
                            { icon: <Shield size={20} />, step: '04', title: 'Получение', desc: 'Выдаём паспорт с визой лично или курьером' },
                        ].map((step, i) => (
                            <div key={i} className="p-5 rounded-xl border border-t-border bg-t-card relative">
                                <span className="absolute top-3 right-3 text-t-strong/20 font-mono text-2xl font-bold">{step.step}</span>
                                <div className="text-t-strong mb-3">{step.icon}</div>
                                <h4 className="text-t-text font-semibold text-sm mb-1">{step.title}</h4>
                                <p className="text-t-subtle text-xs leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ — Objection Handling Architecture (5 Universal Objections) */}
                <div className="mb-16">
                    <h2 className="text-2xl font-heading font-bold text-t-text mb-8">Частые вопросы</h2>
                    <div className="space-y-2">
                        {FAQ_ITEMS.map((item, i) => (
                            <FaqItem key={i} item={item} />
                        ))}
                    </div>
                </div>

                {/* Final CTA with Risk Reversal + Social Proof */}
                <div className="text-center p-10 rounded-2xl border border-t-strong/10 bg-t-strong/[0.03]">
                    <h2 className="text-2xl font-heading font-bold text-t-text mb-3">Готовы оформить визу?</h2>
                    <p className="text-t-muted mb-6">Бесплатная консультация — ответим за 15 минут в рабочее время</p>

                    {/* Primary CTA */}
                    <button className="px-8 py-3.5 rounded-xl bg-t-strong text-t-bg font-semibold text-sm hover:scale-105 transition-transform mb-4">
                        Получить бесплатную консультацию
                    </button>

                    {/* Risk Reversal (Trust Cascade Step 4) */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-t-subtle mt-4">
                        <span className="flex items-center gap-1">
                            <Shield size={12} className="text-t-strong/60" />
                            Возврат при отказе
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} className="text-t-strong/60" />
                            Ответ за 15 минут
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                            <Star size={12} className="text-t-strong/60" />
                            15,000+ виз оформлено
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaPage;
