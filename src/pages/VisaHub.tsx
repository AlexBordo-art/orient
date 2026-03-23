import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import SpecialistBlock from '../components/SpecialistBlock';
import { Stamp, ArrowRight } from 'lucide-react';

const VISA_COUNTRIES = [
    { slug: 'china', name: 'Китай', icon: '🇨🇳', desc: 'Туристические, деловые и групповые визы', popular: true },
    { slug: 'korea', name: 'Южная Корея', icon: '🇰🇷', desc: 'K-ETA, деловые, этнические и учебные визы', popular: true },
    { slug: 'thailand', name: 'Таиланд', icon: '🇹🇭', desc: 'TR, пенсионные и визы цифрового кочевника', popular: true },
    { slug: 'schengen', name: 'Шенгенская зона', icon: '🇪🇺', desc: 'Единая виза для 27 стран Европы', popular: true },
    { slug: 'singapore', name: 'Сингапур', icon: '🇸🇬', desc: 'Электронная виза eVisa' },
    { slug: 'india', name: 'Индия', icon: '🇮🇳', desc: 'Электронная туристическая виза ETA' },
    { slug: 'bulgaria', name: 'Болгария', icon: '🇧🇬', desc: 'Гостевые, туристические и долгосрочные визы' },
    { slug: 'cyprus', name: 'Кипр', icon: '🇨🇾', desc: 'Национальные и визы по недвижимости' },
];

const VisaHub: React.FC = () => {
    return (
        <div className="min-h-screen bg-t-bg">
            <SEO
                title="Оформление виз — Визовый центр"
                description="Визовый центр Ориент Экспресс: визы в Китай, Корею, Таиланд, Шенген, Сингапур, Индию, Болгарию, Кипр. 99.8% одобрений. Оформление под ключ от 3000₽."
                canonical="/visas"
                keywords="оформление виз, виза в Китай, виза в Корею, шенгенская виза, визовый центр Хабаровск"
            />
            <Breadcrumbs />
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center">
                            <Stamp className="text-t-strong" size={24} />
                        </div>
                        <span className="text-t-accent text-sm font-mono tracking-widest uppercase opacity-60">Визовый Центр</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-t-text mb-6 tracking-tight">
                        Оформление виз <br />
                        <span className="text-t-accent italic">без бюрократии</span>
                    </h1>
                    <p className="text-t-muted text-lg max-w-2xl leading-relaxed">
                        12+ лет экспертизы. 15,000+ успешно оформленных виз. Офисы в Хабаровске и Москве.
                        Мы берём весь процесс на себя — от аудита документов до подачи.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {VISA_COUNTRIES.map(country => (
                        <Link
                            key={country.slug}
                            to={`/visas/${country.slug}`}
                            className="group relative p-6 rounded-2xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500"
                        >
                            {country.popular && (
                                <span className="absolute top-3 right-3 text-[10px] font-mono text-t-accent bg-t-strong/10 px-2 py-0.5 rounded-full">
                                    популярное
                                </span>
                            )}
                            <div className="text-4xl mb-4">{country.icon}</div>
                            <h3 className="text-t-text font-semibold text-lg mb-2 group-hover:text-t-strong transition-colors">{country.name}</h3>
                            <p className="text-t-subtle text-sm leading-relaxed mb-4">{country.desc}</p>
                            <div className="flex items-center gap-2 text-t-accent text-sm group-hover:text-t-strong transition-colors">
                                <span>Подробнее</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                <SpecialistBlock type="visa" />

                <div className="mt-8 p-8 rounded-2xl border border-t-border bg-t-card">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-t-strong mb-2">99.8%</div>
                            <div className="text-t-muted text-sm">Одобренных заявок</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-t-strong mb-2">12+ лет</div>
                            <div className="text-t-muted text-sm">На рынке</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-t-strong mb-2">15,000+</div>
                            <div className="text-t-muted text-sm">Оформленных виз</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaHub;
