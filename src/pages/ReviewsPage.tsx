import React from 'react';
import { Star, ArrowRight, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { REVIEWS } from '../data/reviews';

const ReviewsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-transparent pb-24">
            <SEO
                title="Отзывы — Ориент Экспресс"
                description="Отзывы клиентов бюро путешествий «Ориент Экспресс» на 2ГИС и Яндекс Картах. Высокие оценки качества виз и авторских туров."
                canonical="/reviews"
                keywords="отзывы Ориент Экспресс, отзывы визы Хабаровск, 2гис, яндекс карты"
            />
            <Breadcrumbs />

            <div className="max-w-5xl mx-auto px-6 pt-6">
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center">
                            <MessageSquare className="text-t-strong" size={22} />
                        </div>
                        <span className="text-t-accent text-sm font-mono tracking-widest uppercase opacity-60">Отзывы</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-light text-t-text mb-6 tracking-tight">
                        Репутация <span className="text-t-accent italic font-normal">на независимых площадках</span>
                    </h1>
                    <p className="text-t-muted text-lg max-w-2xl font-sans font-light leading-relaxed">
                        Мы не публикуем отзывы у себя — их можно прочитать там, где их оставляют сами клиенты.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {REVIEWS.map(r => (
                        <a
                            key={r.platform}
                            href={r.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-3xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500 p-8 md:p-10 flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <h2 className="text-2xl md:text-3xl font-heading font-medium text-t-text group-hover:text-t-accent transition-colors">
                                    {r.platform}
                                </h2>
                                <div className="text-right flex flex-col items-end">
                                    <div className="flex items-center gap-2 text-t-strong">
                                        <span className="text-2xl font-bold font-mono">{r.rating}</span>
                                        <Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <div className="text-[10px] font-mono text-t-subtle uppercase tracking-widest mt-1">
                                        {r.count} отзывов
                                    </div>
                                </div>
                            </div>
                            <p className="text-t-muted font-sans font-light leading-relaxed mb-8">{r.desc}</p>
                            <div className="mt-auto flex items-center gap-2 text-t-accent text-sm font-bold tracking-widest uppercase group-hover:text-t-strong transition-colors">
                                Читать отзывы
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
