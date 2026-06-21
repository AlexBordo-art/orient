import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { posts } from '../data/blog';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = posts.find(p => p.id === slug);

    // Unknown slug → back to the index rather than a dead page.
    if (!post) return <Navigate to="/blog" replace />;

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
                {/* Banner */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-3xl overflow-hidden border border-t-border mb-8">
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent z-10" />
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-t-subtle uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-heading font-medium text-t-text mb-8 leading-tight tracking-tight">
                    {post.title}
                </h1>

                {/* Content */}
                <div className="font-sans font-light text-t-text/80 text-base leading-relaxed space-y-6 max-w-3xl border-b border-t-border/50 pb-10 mb-10 whitespace-pre-line">
                    {post.content}
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
