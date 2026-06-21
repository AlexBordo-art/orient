import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, BookOpen, ArrowRight, MapPin, Phone, Star } from 'lucide-react';
import SEO from '../components/SEO';
import { REVIEWS } from '../data/reviews';

const SECONDARY = [
    { to: '/education', icon: GraduationCap, label: 'Образование', desc: 'Учёба и языковые программы за рубежом' },
    { to: '/services', icon: Briefcase, label: 'Услуги', desc: 'Карты АТЭС, гиды, отели, авиабилеты, страхование' },
    { to: '/blog', icon: BookOpen, label: 'Блог', desc: 'Заметки путешественника' },
];

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-transparent">
            <SEO
                title="Ориент Экспресс — авторские туры и визы в Азию из Хабаровска"
                description="Бюро путешествий «Ориент Экспресс» с 2007 года: авторские туры по Китаю и Японии, оформление виз, образование за рубежом. Хабаровск и Москва."
                canonical="/"
                keywords="туры в Китай, туры в Японию, визы, путешествия из Хабаровска, Ориент Экспресс"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "TravelAgency",
                    "name": "Ориент Экспресс",
                    "description": "Бюро путешествий и визовой поддержки: авторские туры по Китаю и Японии, оформление виз, образование за рубежом.",
                    "foundingDate": "2007",
                    "telephone": "+7 916 466 56 06",
                    "address": [
                        { "@type": "PostalAddress", "streetAddress": "ул. Дикопольцева, 26", "addressLocality": "Хабаровск", "addressCountry": "RU" },
                        { "@type": "PostalAddress", "addressLocality": "Москва", "addressCountry": "RU" }
                    ]
                }}
            />

            <div className="max-w-7xl mx-auto px-6 pb-24">
                {/* Hero */}
                <header className="pt-36 md:pt-44 pb-14 md:pb-20 text-center max-w-3xl mx-auto">
                    <span className="text-t-accent text-xs md:text-sm font-mono tracking-[0.25em] uppercase opacity-70">
                        Бюро путешествий «Ориент Экспресс» · с 2007
                    </span>
                    <h1 className="mt-6 text-5xl md:text-7xl font-heading font-light text-t-text leading-[1.05] tracking-tight">
                        Путешествие в Азию <br />
                        <span className="text-t-accent italic font-normal">без бюрократии и спешки</span>
                    </h1>
                    <p className="mt-7 text-t-muted text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
                        Авторские туры по Китаю и Японии, оформление виз и образование за рубежом.
                        Из Хабаровска и Москвы — по всему миру.
                    </p>
                </header>

                {/* Two doors — editorial image panels; travel leads, visas alongside */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {/* Путешествия — the face of the brand */}
                    <Link
                        to="/tours"
                        className="group relative md:col-span-3 rounded-3xl overflow-hidden border border-t-border min-h-[22rem] md:min-h-[28rem] flex"
                    >
                        <img
                            src="/backgrounds/bg-sakura.webp"
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5" />
                        <div className="relative z-10 mt-auto p-8 md:p-12 w-full">
                            <span className="text-white/70 text-xs font-mono tracking-widest uppercase mb-3 block">
                                Путешествия
                            </span>
                            <h2 className="text-3xl md:text-5xl font-heading font-medium text-white leading-tight tracking-tight mb-4">
                                Авторские туры
                            </h2>
                            <p className="text-white/80 text-base font-sans font-light leading-relaxed max-w-md mb-8">
                                Китай и Япония — маршруты, которые наши эксперты прошли лично.
                                Вылеты из Хабаровска, Владивостока и Москвы.
                            </p>
                            <div className="flex items-center gap-2 text-white text-sm font-bold tracking-widest uppercase">
                                Выбрать маршрут
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Визы — important second door */}
                    <Link
                        to="/visas"
                        className="group relative md:col-span-2 rounded-3xl overflow-hidden border border-t-border min-h-[22rem] md:min-h-[28rem] flex"
                    >
                        <img
                            src="/backgrounds/bg-bambuk.webp"
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5" />
                        <div className="relative z-10 mt-auto p-8 md:p-10 w-full">
                            <span className="text-white/70 text-xs font-mono tracking-widest uppercase mb-3 block">
                                Визы
                            </span>
                            <h2 className="text-2xl md:text-3xl font-heading font-medium text-white leading-tight tracking-tight mb-4">
                                Оформление виз
                            </h2>
                            <p className="text-white/80 text-base font-sans font-light leading-relaxed mb-8">
                                Китай, Корея, Таиланд, Шенген и другие. Для жителей ДВ —
                                оформление в консульстве Хабаровска.
                            </p>
                            <div className="flex items-center gap-2 text-white text-sm font-bold tracking-widest uppercase">
                                Оформить визу
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Secondary — quieter doors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {SECONDARY.map(({ to, icon: Icon, label, desc }) => (
                        <Link
                            key={to}
                            to={to}
                            className="group rounded-2xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500 p-6 flex items-start gap-4"
                        >
                            <div className="w-10 h-10 rounded-xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center shrink-0">
                                <Icon className="text-t-strong" size={18} />
                            </div>
                            <div>
                                <h3 className="text-t-text font-heading font-medium text-lg mb-1 group-hover:text-t-accent transition-colors">
                                    {label}
                                </h3>
                                <p className="text-t-subtle text-sm font-sans font-light leading-relaxed">{desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Trust — real review platforms */}
                <div className="mt-20">
                    <p className="text-center text-t-accent text-xs font-mono tracking-widest uppercase opacity-60 mb-6">
                        Нам доверяют
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {REVIEWS.map(r => (
                            <a
                                key={r.platform}
                                href={r.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-2xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500 p-6 flex items-center justify-between gap-4"
                            >
                                <div>
                                    <div className="text-t-text font-heading font-medium text-lg group-hover:text-t-accent transition-colors">
                                        {r.platform}
                                    </div>
                                    <div className="text-t-subtle text-xs font-sans font-light mt-0.5">{r.count} отзывов</div>
                                </div>
                                <div className="flex items-center gap-1.5 text-t-strong shrink-0">
                                    <span className="font-mono font-bold text-xl">{r.rating}</span>
                                    <Star size={16} className="fill-current" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quiet contact line (real details) */}
                <div className="mt-16 pt-8 border-t border-t-border/50 flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 text-t-subtle text-sm font-sans font-light">
                    <span className="flex items-center gap-2">
                        <MapPin size={14} className="text-t-accent/70" /> Офисы в Хабаровске и Москве · с 2007
                    </span>
                    <a href="tel:+79164665606" className="flex items-center gap-2 hover:text-t-strong transition-colors">
                        <Phone size={14} className="text-t-accent/70" /> +7 916 466 56 06
                    </a>
                    <Link to="/contact" className="hover:text-t-strong transition-colors">Контакты →</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
