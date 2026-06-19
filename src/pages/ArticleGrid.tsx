import React, { useState, useContext } from 'react';
import { ArrowRight, BookOpen, Clock, X, ChevronRight } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import { articles, Article } from '../data/blog';
import { TOURS_DATA } from '../data/tours';
import { Link } from 'react-router-dom';
import { ModalContext } from '../layouts/RootLayout';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const ArticleGrid: React.FC = () => {
    const { openLeadModal } = useContext(ModalContext);
    const [selectedCategory, setSelectedCategory] = useState<'Все' | 'Китай' | 'Япония'>('Все');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const filteredArticles = articles.filter(
        article => selectedCategory === 'Все' || article.category === selectedCategory
    );

    // Find featured article in the filtered list (or fallback to first)
    const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
    const regularArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

    // Find cross-linked tour
    const getLinkedTour = (category: 'Китай' | 'Япония') => {
        const tourCategory = category === 'Китай' ? 'china' : 'japan';
        return TOURS_DATA.find(t => t.category === tourCategory);
    };

    return (
        <div className="min-h-screen bg-transparent pb-24">
            <SEO
                title="Блог путешественника — Ориент Экспресс"
                description="Инсайды, разборы кейсов, достопримечательности Китая и Японии от экспертов бюро путешествий Ориент Экспресс."
                canonical="/blog"
                keywords="достопримечательности Китая, достопримечательности Японии, путешествие в Азию, блог о туризме"
            />
            <Breadcrumbs />

            <div className="max-w-7xl mx-auto px-6 pt-12">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center">
                            <BookOpen className="text-t-strong" size={20} />
                        </div>
                        <span className="text-t-accent text-sm font-mono tracking-widest uppercase opacity-60">
                            Бортовой журнал
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-light text-t-text mb-6 tracking-tight">
                        Достопримечательности <br />
                        <span className="text-t-accent italic font-normal">и аналитика</span>
                    </h1>
                    <p className="text-t-muted text-lg max-w-2xl mx-auto font-sans font-light leading-relaxed">
                        Делимся авторскими обзорами локаций, культурными кодами и инсайдами о визовом протоколе, чтобы ваши путешествия были безупречными.
                    </p>
                </div>

                {/* Category Filtering Tabs */}
                <div className="flex justify-center gap-2 mb-16 border-b border-t-border/50 pb-4">
                    {(['Все', 'Китай', 'Япония'] as const).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                                selectedCategory === cat
                                    ? 'bg-t-strong text-t-bg font-bold'
                                    : 'text-t-subtle hover:text-t-strong hover:bg-t-strong/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredArticles.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-t-border rounded-3xl bg-t-card">
                        <p className="text-t-muted font-sans font-light">В этой категории пока нет статей.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Featured Article (Left/Main section, spanning 2 columns) */}
                        {featuredArticle && (
                            <div
                                onClick={() => setSelectedArticle(featuredArticle)}
                                className="lg:col-span-2 group cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    <div className="relative h-96 md:h-[480px] w-full rounded-3xl overflow-hidden mb-6 shadow-2xl border border-t-border">
                                        <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        <img
                                            src={featuredArticle.image}
                                            alt={featuredArticle.title}
                                            className="w-full h-full object-cover transform scale-100 group-hover:scale-101 transition-transform duration-700"
                                        />
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className="bg-t-strong text-t-bg px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
                                                {featuredArticle.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-[10px] font-mono text-t-subtle uppercase tracking-widest mb-3">
                                        <span>{featuredArticle.date}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl md:text-4xl font-heading font-medium text-t-text mb-4 group-hover:text-t-accent transition-colors leading-tight tracking-tight">
                                        {featuredArticle.title}
                                    </h2>

                                    <p className="text-t-muted font-sans font-light text-base leading-relaxed mb-6 max-w-3xl">
                                        {featuredArticle.excerpt}
                                    </p>
                                </div>

                                <Magnetic strength={10}>
                                    <div className="inline-flex items-center gap-2 text-t-accent font-bold text-xs tracking-widest uppercase group-hover:text-t-strong transition-colors magnetic-button">
                                        Читать статью <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Magnetic>
                            </div>
                        )}

                        {/* Regular Articles Stack (Right section, 1 column) */}
                        <div className="flex flex-col gap-8 lg:col-span-1 border-t lg:border-t-0 lg:border-l border-t-border/50 lg:border-l-border/50 lg:pl-10 pt-10 lg:pt-0">
                            <h3 className="text-xs font-mono tracking-widest uppercase text-t-accent opacity-60 mb-2">
                                Другие материалы
                            </h3>
                            <div className="flex flex-col gap-8 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                                {regularArticles.map(article => (
                                    <div
                                        key={article.id}
                                        onClick={() => setSelectedArticle(article)}
                                        className="group cursor-pointer border-b border-t-border/40 pb-6 last:border-0"
                                    >
                                        <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 border border-t-border">
                                            <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transform scale-100 group-hover:scale-101 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-t-accent text-[9px] font-mono uppercase tracking-widest font-bold border border-t-accent/20 px-2 py-0.5 rounded-full">
                                                {article.category}
                                            </span>
                                            <span className="text-[9px] font-mono text-t-subtle tracking-wider">{article.date}</span>
                                        </div>

                                        <h4 className="text-lg font-heading font-medium text-t-text mb-2 group-hover:text-t-accent transition-colors leading-snug tracking-tight">
                                            {article.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Newsletter Subscription Block */}
                <div className="mt-24 p-8 md:p-12 rounded-3xl border border-t-strong/10 bg-t-strong/[0.02] backdrop-blur-sm relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-t-accent/5 rounded-full filter blur-[50px] pointer-events-none"></div>

                    <div className="relative z-10 max-w-xl">
                        <h3 className="text-2xl md:text-3xl font-heading font-medium text-t-text mb-4 tracking-tight">
                            Закрытый клуб путешественников
                        </h3>
                        <p className="text-t-muted font-sans font-light text-sm leading-relaxed">
                            Инсайды о визовых изменениях, аналитика одобрений, анонсы премиальных авторских туров и экспедиций. Отправляем раз в месяц.
                        </p>
                    </div>

                    <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                        <div className="flex w-full md:w-[400px] rounded-full overflow-hidden border border-t-border bg-t-card p-1 shadow-lg">
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full px-5 py-3 bg-transparent text-t-text placeholder:text-t-subtle/50 text-sm focus:outline-none font-sans font-light"
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    openLeadModal();
                                }}
                                className="px-6 py-3 bg-t-strong text-t-bg hover:bg-t-strong/90 transition-colors rounded-full font-mono text-[10px] uppercase font-bold tracking-widest"
                            >
                                Доступ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Article View Modal */}
            {selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-obsidian/75 backdrop-blur-md transition-opacity duration-300">
                    <div 
                        className="relative w-full max-w-4xl bg-t-card border border-t-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedArticle(null)}
                            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-t-bg/80 border border-t-border text-t-text hover:text-t-strong hover:scale-105 transition-all shadow-md"
                        >
                            <X size={20} />
                        </button>

                        {/* Modal Header/Banner */}
                        <div className="relative h-64 sm:h-80 md:h-96 w-full flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-t-card via-transparent to-transparent z-10" />
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-8 z-20">
                                <span className="bg-t-strong text-t-bg px-3.5 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold shadow-md">
                                    {selectedArticle.category}
                                </span>
                            </div>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="flex-grow overflow-y-auto px-8 pb-12 pt-6 custom-scrollbar">
                            <div className="flex items-center gap-4 text-[10px] font-mono text-t-subtle uppercase tracking-widest mb-4">
                                <span>{selectedArticle.date}</span>
                                <span>·</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-heading font-medium text-t-text mb-8 leading-tight tracking-tight">
                                {selectedArticle.title}
                            </h2>

                            {/* Content */}
                            <div className="font-sans font-light text-t-text/80 text-base leading-relaxed space-y-6 max-w-3xl border-b border-t-border/50 pb-10 mb-10 whitespace-pre-line">
                                {selectedArticle.content}
                            </div>

                            {/* Cross-Linking System Section */}
                            {getLinkedTour(selectedArticle.category) && (
                                <div className="p-6 sm:p-8 rounded-2xl border border-t-border bg-t-strong/[0.01] flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="max-w-xl">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-t-accent opacity-75 mb-2 block">
                                            Экспедиции Orient Express
                                        </span>
                                        <h4 className="text-xl font-heading font-medium text-t-text mb-2 tracking-tight">
                                            {getLinkedTour(selectedArticle.category)?.title}
                                        </h4>
                                        <p className="text-t-muted text-xs font-sans font-light leading-relaxed">
                                            Откройте для себя достопримечательности в нашем премиальном авторском туре. Маршрут: {getLinkedTour(selectedArticle.category)?.route}
                                        </p>
                                    </div>

                                    <Link
                                        to={`/tours/${selectedArticle.category === 'Китай' ? 'china' : 'japan'}/${getLinkedTour(selectedArticle.category)?.id}`}
                                        onClick={() => setSelectedArticle(null)}
                                        className="btn-premium shrink-0 !py-3 !px-6 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2"
                                    >
                                        К описанию тура <ChevronRight size={14} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleGrid;
