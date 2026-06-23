import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TOURS_DATA } from '../data/tours';
import { ModalContext } from '../layouts/RootLayout';
import { useTheme } from '../contexts/ThemeContext';
import SEO from '../components/SEO';
import SpecialistBlock from '../components/SpecialistBlock';
import { Calendar, CheckCircle2, Compass, MapPin, XCircle, ChevronRight } from 'lucide-react';

const TourPage: React.FC = () => {
    const { destination, tourId } = useParams<{ destination: string; tourId: string }>();
    const navigate = useNavigate();
    const { openLeadModal } = useContext(ModalContext);
    const { isDay } = useTheme();

    const tour = TOURS_DATA.find(t => t.id === tourId && t.category === destination);

    if (!tour) {
        return (
            <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-6 text-center">
                <SEO title="Тур не найден" description="Запрошенный маршрут отсутствует или находится в архиве." />
                <Compass className="text-t-accent mb-4 animate-spin-slow" size={48} />
                <h1 className="text-2xl font-heading text-t-text mb-2">Маршрут не найден</h1>
                <p className="text-t-muted text-sm max-w-sm mb-6">
                    Маршрут перенесен или еще готовится к публикации.
                </p>
                <button onClick={() => navigate('/tours')} className="btn-premium">
                    Назад к турам
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
            <SEO
                title={`${tour.title} — Авторский тур`}
                description={`${tour.subtitle}. Маршрут: ${tour.route}. Длительность: ${tour.duration}.`}
                canonical={`/tours/${destination}/${tour.id}`}
            />
            {/* Photo header — full-bleed from the very top; navbar + back-link float over it, no dark bar.
               object-cover fills any screen width (crops only the airy top/bottom of the square cover, never distorts). */}
            <div className="relative w-full h-[58vh] sm:h-[64vh] lg:h-[72vh] overflow-hidden">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ opacity: isDay ? 1 : 0, transition: 'opacity 700ms ease' }}
                />
                <img
                    src={tour.imageNight || tour.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ opacity: isDay ? 0 : 1, transition: 'opacity 700ms ease' }}
                />

                {/* Back to list — light overlay on the photo, no separate bar */}
                <button
                    onClick={() => navigate(`/tours/${destination}`)}
                    className="absolute top-20 md:top-24 left-6 z-20 text-white/90 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors group"
                    style={{ textShadow: '0 1px 10px rgba(0,0,0,0.65)' }}
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Вернуться к списку
                </button>

                {/* Bottom dissolve into the current theme tone (obsidian by night, champagne/cream by day) */}
                <div
                    className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, var(--color-bg) 0%, var(--color-bg) 4%, transparent 100%)' }}
                />
            </div>

            {/* Title + meta + route on the flat theme tone */}
            <div className="max-w-7xl mx-auto w-full px-6 -mt-6 md:-mt-10 relative z-10 mb-4">
                {(tour.duration || tour.dates) && (
                    <div className="flex items-center gap-3 mb-4 flex-wrap text-t-accent">
                        {tour.duration && (
                            <div className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider">
                                <Calendar size={14} />
                                <span>{tour.duration}</span>
                            </div>
                        )}
                        {tour.duration && tour.dates && <span className="w-1.5 h-1.5 rounded-full bg-t-strong/45"></span>}
                        {tour.dates && <span className="text-xs font-mono uppercase tracking-wider">{tour.dates}</span>}
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-t-text mb-4 tracking-tight leading-[1.05]">
                    {tour.title}
                </h1>

                {tour.subtitle && (
                    <p className="text-t-muted text-lg md:text-xl font-light italic max-w-3xl leading-relaxed mb-6">
                        {tour.subtitle}
                    </p>
                )}

                <div className="flex items-start gap-2 text-t-muted text-sm md:text-base max-w-2xl bg-t-card border border-t-border p-4 rounded-xl">
                    <MapPin size={20} className="shrink-0 text-t-strong mt-0.5" />
                    <span>{tour.route}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Program and Details */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl md:text-3xl font-heading text-t-text mb-8 tracking-tight border-b border-t-border pb-4">
                        Программа путешествия
                    </h2>

                    {/* Timeline */}
                    <div className="relative border-l border-t-strong/20 pl-6 md:pl-8 ml-3 md:ml-4 space-y-12 mb-16">
                        {tour.itinerary.map((day, index) => (
                            <div key={index} className="relative group">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[31px] md: -left-[39px] top-1.5 w-4 h-4 rounded-full bg-t-strong border-2 border-t-bg transition-transform duration-300 group-hover:scale-125 z-10" />

                                <div className="bg-t-card border border-t-border rounded-xl p-5 md:p-6 shadow-md hover:border-t-strong/20 transition-all duration-300">
                                    <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                                        <span className="font-mono text-xs uppercase tracking-widest text-t-strong font-bold bg-t-strong/10 border border-t-strong/20 px-2.5 py-0.5 rounded">
                                            {day.day}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-t-text/20"></span>
                                        <h3 className="text-t-text font-heading font-medium text-lg md:text-xl">
                                            {day.title}
                                        </h3>
                                    </div>
                                    <p className="text-t-muted text-sm md:text-base leading-relaxed font-sans font-light">
                                        {day.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Exclusions/Inclusions — only when we actually have the data */}
                    {(tour.included.length > 0 || tour.notIncluded.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-t-border pt-12">
                            {/* Included */}
                            {tour.included.length > 0 && (
                                <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-6 md:p-8">
                                    <h3 className="text-t-text font-heading text-xl mb-5 flex items-center gap-2">
                                        <CheckCircle2 className="text-emerald-500" size={22} />
                                        В стоимость включено
                                    </h3>
                                    <ul className="space-y-3">
                                        {tour.included.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-xs md:text-sm text-t-muted items-start font-sans font-light leading-relaxed">
                                                <span className="text-emerald-500 mt-1 shrink-0">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Not Included */}
                            {tour.notIncluded.length > 0 && (
                                <div className="bg-rose-500/5 border border-rose-500/15 rounded-2xl p-6 md:p-8">
                                    <h3 className="text-t-text font-heading text-xl mb-5 flex items-center gap-2">
                                        <XCircle className="text-rose-500" size={22} />
                                        Не включено
                                    </h3>
                                    <ul className="space-y-3">
                                        {tour.notIncluded.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-xs md:text-sm text-t-muted items-start font-sans font-light leading-relaxed">
                                                <span className="text-rose-500 mt-1 shrink-0">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Sidebar: Price & Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20 bg-t-card border border-t-border rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-t-strong" />

                        <div className="mb-6">
                            <span className="font-mono text-t-text/50 text-[10px] tracking-widest uppercase block mb-1">Стоимость тура</span>
                            <div className="text-3xl md:text-4xl font-heading font-bold text-t-text tracking-tight mb-2">
                                {tour.price || 'Цена по запросу'}
                                {tour.price && <span className="text-[10px] font-mono tracking-tighter text-t-text/40 uppercase"> / за человека</span>}
                            </div>
                            {/CNY|юан/i.test(tour.price) && (
                                <p className="text-t-subtle text-xs leading-relaxed font-sans font-light mb-4">
                                    Стоимость рассчитывается в юанях по курсу ЦБ РФ + 6% на день оплаты.
                                </p>
                            )}
                            {tour.dates && <span className="text-t-text/40 text-[10px] font-mono block">Ближайшие даты: {tour.dates}</span>}
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={openLeadModal}
                                className="btn-card btn-card-primary justify-center py-4 rounded-xl w-full flex items-center gap-2"
                            >
                                <span>Забронировать место</span>
                                <ChevronRight size={16} />
                            </button>
                            <a
                                href="https://wa.me/+79141589504"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-card btn-card-secondary justify-center py-4 rounded-xl w-full flex items-center gap-2 border border-t-border"
                            >
                                <span>Обсудить в WhatsApp</span>
                            </a>
                        </div>

                        <div className="border-t border-t-border mt-6 pt-6 text-t-muted text-xs leading-relaxed font-sans font-light">
                            <strong>Важная информация:</strong> Точную стоимость, доступные даты и полный список включённых услуг уточняйте у менеджера — мы подберём и адаптируем маршрут под вас.
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">
                <SpecialistBlock type="china" />
            </div>
        </div>
    );
};

export default TourPage;
