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
                        Личные истории из поездок Елены Журавской — впечатления, маршруты и детали, которые не попадают в путеводители.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-t-border rounded-3xl bg-t-card backdrop-blur-md">
                        <p className="text-t-muted font-sans font-light">Здесь пока нет записей.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Featured — an editorial panel (works with or without a cover) */}
                        {featured && (
                            <Link to={`/blog/${featured.id}`} className="lg:col-span-2 group">
                                <div className="relative h-full min-h-[380px] md:min-h-[460px] flex flex-col justify-end rounded-3xl border border-t-border bg-t-card backdrop-blur-md overflow-hidden p-8 md:p-12 transition-colors duration-500 group-hover:border-t-strong/30">
                                    {featured.image && (
                                        <>
                                            <img
                                                src={featured.image}
                                                alt={featured.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/40 to-transparent" />
                                        </>
                                    )}
                                    <div className="relative">
                                        <div className="w-10 h-px bg-t-strong/50 mb-5" />
                                        <div className="flex items-center gap-3 text-[10px] font-mono text-t-subtle uppercase tracking-widest mb-4">
                                            <span className="text-t-accent">{featured.region}</span>
                                            <span className="w-1 h-1 rounded-full bg-t-text/20" />
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" /> {featured.readTime}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-heading font-medium text-t-text mb-5 leading-[1.1] tracking-tight group-hover:text-t-accent transition-colors max-w-2xl">
                                            {featured.title}
                                        </h2>
                                        <p className="text-t-muted font-sans font-light text-base md:text-lg leading-relaxed mb-7 max-w-2xl">
                                            {featured.excerpt}
                                        </p>
                                        <Magnetic strength={10}>
                                            <div className="inline-flex items-center gap-2 text-t-accent font-bold text-xs tracking-widest uppercase group-hover:text-t-strong transition-colors magnetic-button">
                                                Читать заметку <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </Magnetic>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Other posts — quiet typographic index, no preview tiles */}
                        <div className="lg:col-span-1 lg:border-l border-t-border/50 lg:pl-10">
                            <h3 className="text-xs font-mono tracking-widest uppercase text-t-accent opacity-60 mb-6">
                                Другие заметки
                            </h3>
                            <div className="flex flex-col">
                                {rest.map(post => (
                                    <Link
                                        key={post.id}
                                        to={`/blog/${post.id}`}
                                        className="group block border-b border-t-border/40 py-5 first:pt-0 last:border-0"
                                    >
                                        <div className="flex items-center gap-3 mb-2 text-[9px] font-mono text-t-subtle uppercase tracking-widest">
                                            <span className="text-t-accent/80">{post.region}</span>
                                            <span className="w-1 h-1 rounded-full bg-t-text/20" />
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {post.readTime}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-heading font-medium text-t-text leading-snug tracking-tight group-hover:text-t-accent transition-colors">
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
