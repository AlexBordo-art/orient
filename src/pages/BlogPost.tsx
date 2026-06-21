import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { articles } from '../data/blog';
import { TOURS_DATA } from '../data/tours';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const article = articles.find(a => a.id === slug);

    // Unknown slug → back to the index rather than a dead page.
    if (!article) return <Navigate to="/blog" replace />;

    const tourCategory = article.category === 'Китай' ? 'china' : 'japan';
    const linkedTour = TOURS_DATA.find(t => t.category === tourCategory);

    return (
        <div className="min-h-screen bg-transparent pb-24">
            <SEO
                title={`${article.title} — Ориент Экспресс`}
                description={article.excerpt}
                canonical={`/blog/${article.id}`}
                keywords={`${article.category}, достопримечательности, путешествие в Азию`}
            />
            <Breadcrumbs overrides={{ [article.id]: article.title }} />

            <article className="max-w-4xl mx-auto px-6 pt-6">
                {/* Banner */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-3xl overflow-hidden border border-t-border mb-8">
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent z-10" />
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-8 z-20">
                        <span className="bg-t-strong text-t-bg px-3.5 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold shadow-md">
                            {article.category}
                        </span>
                    </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-t-subtle uppercase tracking-widest mb-4">
                    {article.date && <><span>{article.date}</span><span>·</span></>}
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-heading font-medium text-t-text mb-8 leading-tight tracking-tight">
                    {article.title}
                </h1>

                {/* Content */}
                <div className="font-sans font-light text-t-text/80 text-base leading-relaxed space-y-6 max-w-3xl border-b border-t-border/50 pb-10 mb-10 whitespace-pre-line">
                    {article.content}
                </div>

                {/* Cross-link to the matching author tour */}
                {linkedTour && (
                    <div className="p-6 sm:p-8 rounded-2xl border border-t-border bg-t-strong/[0.01] flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        <div className="max-w-xl">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-t-accent opacity-75 mb-2 block">
                                Экспедиции Orient Express
                            </span>
                            <h2 className="text-xl font-heading font-medium text-t-text mb-2 tracking-tight">
                                {linkedTour.title}
                            </h2>
                            <p className="text-t-muted text-xs font-sans font-light leading-relaxed">
                                Откройте для себя достопримечательности в нашем премиальном авторском туре. Маршрут: {linkedTour.route}
                            </p>
                        </div>
                        <Link
                            to={`/tours/${tourCategory}/${linkedTour.id}`}
                            className="btn-premium shrink-0 !py-3 !px-6 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2"
                        >
                            К описанию тура <ChevronRight size={14} />
                        </Link>
                    </div>
                )}

                {/* Back to index */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-t-accent font-bold text-xs tracking-widest uppercase hover:text-t-strong transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Все материалы
                </Link>
            </article>
        </div>
    );
};

export default BlogPost;
