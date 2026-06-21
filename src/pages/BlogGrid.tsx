import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import { posts } from '../data/blog';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogGrid: React.FC = () => {
    const featured = posts.find(p => p.featured) || posts[0];
    const rest = posts.filter(p => p.id !== featured?.id);

    return (
        <div className="min-h-screen bg-transparent pb-24">
            <SEO
                title="Блог путешественника — Ориент Экспресс"
                description="Авторские travel-заметки из Кореи, Китая, Таджикистана и Таиланда от команды Ориент Экспресс."
                canonical="/blog"
                keywords="travel блог, путешествия по Азии, заметки путешественника"
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
                        Заметки <span className="text-t-accent italic font-normal">путешественника</span>
                    </h1>
                    <p className="text-t-muted text-lg max-w-2xl mx-auto font-sans font-light leading-relaxed">
                        Личные истории из поездок — впечатления, маршруты и детали, которые не попадают в путеводители.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-t-border rounded-3xl bg-t-card">
                        <p className="text-t-muted font-sans font-light">Здесь пока нет записей.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Featured post */}
                        {featured && (
                            <Link
                                to={`/blog/${featured.id}`}
                                className="lg:col-span-2 group cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    <div className="relative h-96 md:h-[480px] w-full rounded-3xl overflow-hidden mb-6 shadow-2xl border border-t-border">
                                        <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        <img
                                            src={featured.image}
                                            alt={featured.title}
                                            className="w-full h-full object-cover transform scale-100 group-hover:scale-101 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-mono text-t-subtle uppercase tracking-widest mb-3">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-heading font-medium text-t-text mb-4 group-hover:text-t-accent transition-colors leading-tight tracking-tight">
                                        {featured.title}
                                    </h2>
                                    <p className="text-t-muted font-sans font-light text-base leading-relaxed mb-6 max-w-3xl">
                                        {featured.excerpt}
                                    </p>
                                </div>
                                <Magnetic strength={10}>
                                    <div className="inline-flex items-center gap-2 text-t-accent font-bold text-xs tracking-widest uppercase group-hover:text-t-strong transition-colors magnetic-button">
                                        Читать заметку <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Magnetic>
                            </Link>
                        )}

                        {/* Other posts */}
                        <div className="flex flex-col gap-8 lg:col-span-1 border-t lg:border-t-0 lg:border-l border-t-border/50 lg:border-l-border/50 lg:pl-10 pt-10 lg:pt-0">
                            <h3 className="text-xs font-mono tracking-widest uppercase text-t-accent opacity-60 mb-2">
                                Другие заметки
                            </h3>
                            <div className="flex flex-col gap-8">
                                {rest.map(post => (
                                    <Link
                                        key={post.id}
                                        to={`/blog/${post.id}`}
                                        className="block group cursor-pointer border-b border-t-border/40 pb-6 last:border-0"
                                    >
                                        <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 border border-t-border">
                                            <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform scale-100 group-hover:scale-101 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2 text-[9px] font-mono text-t-subtle tracking-wider uppercase">
                                            <Clock className="w-3 h-3" /> {post.readTime}
                                        </div>
                                        <h4 className="text-lg font-heading font-medium text-t-text mb-2 group-hover:text-t-accent transition-colors leading-snug tracking-tight">
                                            {post.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogGrid;
