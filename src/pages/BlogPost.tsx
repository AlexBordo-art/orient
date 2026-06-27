import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { posts } from '../data/blog';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

// A short line with no sentence-ending punctuation is an author sub-heading (e.g. "Бренд №1").
const isHeading = (block: string) => block.length < 42 && !/[.!?»]$/.test(block);

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = posts.find(p => p.id === slug);

    // Unknown slug → back to the index rather than a dead page.
    if (!post) return <Navigate to="/blog" replace />;

    const blocks = post.content.split(/\n\n+/).map(b => b.trim()).filter(Boolean);
    const ledeIdx = blocks.findIndex(b => !isHeading(b));

    return (
        <div className="min-h-screen bg-transparent pb-24">
            <SEO
                title={`${post.title} — Ориент Экспресс`}
                description={post.excerpt}
                canonical={`/blog/${post.id}`}
                keywords="travel блог, путешествия по Азии, заметки путешественника"
            />
            <Breadcrumbs overrides={{ [post.id]: post.title }} />

            <article className="max-w-4xl mx-auto px-6 pt-6">
                {/* Banner — only when a real cover exists; no broken placeholder */}
                {post.image && (
                    <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-3xl overflow-hidden border border-t-border mb-8">
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent z-10" />
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Region eyebrow + read time */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-t-subtle uppercase tracking-widest mb-4 pt-2">
                    <span className="text-t-accent">{post.region}</span>
                    <span className="w-1 h-1 rounded-full bg-t-text/20" />
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-heading font-medium text-t-text mb-6 leading-tight tracking-tight">
                    {post.title}
                </h1>

                {/* Byline — the owner travels these routes herself; this is the trust signal */}
                <div className="flex items-center gap-3 border-t border-b border-t-border/40 py-4 mb-10">
                    <div className="w-9 h-9 rounded-full bg-t-strong/10 border border-t-strong/30 flex items-center justify-center font-heading text-t-strong text-sm shrink-0">
                        Е
                    </div>
                    <div className="leading-tight">
                        <div className="text-t-text text-sm font-medium">Елена Журавская</div>
                        <div className="text-t-subtle text-xs">основатель «Ориент Экспресс»</div>
                    </div>
                </div>

                {/* Content — paragraphs breathe; first paragraph is a Cormorant lede */}
                <div className="max-w-[68ch] border-b border-t-border/50 pb-10 mb-10">
                    {blocks.map((block, i) => {
                        if (isHeading(block)) {
                            return (
                                <h2 key={i} className="font-heading text-2xl md:text-3xl text-t-accent font-medium mt-12 mb-4 tracking-tight">
                                    {block}
                                </h2>
                            );
                        }
                        if (i === ledeIdx) {
                            return (
                                <p key={i} className="font-heading italic text-xl md:text-2xl text-t-text/90 leading-relaxed mb-8">
                                    {block}
                                </p>
                            );
                        }
                        return (
                            <p key={i} className="font-sans font-light text-base md:text-lg text-t-text/80 leading-[1.8] mb-6">
                                {block}
                            </p>
                        );
                    })}
                </div>

                {/* Back to index */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-t-accent font-bold text-xs tracking-widest uppercase hover:text-t-strong transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Все заметки
                </Link>
            </article>
        </div>
    );
};

export default BlogPost;
