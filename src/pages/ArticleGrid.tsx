import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const articles = [
    {
        id: 1,
        category: 'Аналитика',
        title: 'Шенген 2026: Новые правила цифровизации визового кодекса',
        excerpt: 'Как полный переход на цифровые визы в Европе меняет процесс подачи через хабы в России. Разбираем подводные камни мобильной биометрии.',
        readTime: '8 мин',
        date: '12 Окт 2026',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop',
        featured: true
    },
    {
        id: 2,
        category: 'Азия Премиум',
        title: 'Южная Корея: K-ETA и алгоритмы одобрения',
        excerpt: 'Почему алгоритм системы K-ETA отклоняет 40% анкет и как наш "умный аудит" обходит эти триггеры.',
        readTime: '5 мин',
        date: '05 Окт 2026',
        image: 'https://images.unsplash.com/photo-1546874177-9e6641070624?q=80&w=600&auto=format&fit=crop',
        featured: false
    },
    {
        id: 3,
        category: 'Протокол',
        title: 'Идеальное досье на визу США в Казахстане',
        excerpt: 'Статистика одобрений B1/B2 через консульства в Алматы и Астане. Как подготовиться к интервью.',
        readTime: '12 мин',
        date: '28 Сен 2026',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
        featured: false
    },
    {
        id: 4,
        category: 'Кейсы',
        title: 'Сложный случай: Отказ во Франции и получение Италии на 2 года',
        excerpt: 'Разбираем реальный кейс клиента: перекрытие отказа, сборка нового маршрута и финансового обеспечения.',
        readTime: '6 мин',
        date: '15 Сен 2026',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop',
        featured: false
    }
];

const ArticleGrid: React.FC = () => {
    return (
        <div className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
            <div className="text-center mb-16">
                <h2 className="text-sm font-mono font-bold text-moss tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" /> Intelligence Center
                </h2>
                <h1 className="text-4xl md:text-5xl font-serif text-charcoal font-bold italic mb-6">Аналитика и Протоколы</h1>
                <p className="text-charcoal/60 font-sans text-lg max-w-2xl mx-auto">
                    Исследования, разбор кейсов и технический анализ визовых процедур. Мы делимся знаниями, чтобы вы путешествовали уверенно.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Featured Article (Takes 2 columns on desktop) */}
                {articles.filter(a => a.featured).map(article => (
                    <div key={article.id} className="md:col-span-2 group cursor-pointer">
                        <div className="relative h-96 md:h-[500px] w-full rounded-3xl overflow-hidden mb-6">
                            <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-6 left-6 z-20">
                                <span className="bg-cream text-charcoal px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold">
                                    {article.category}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono text-charcoal/50 uppercase tracking-widest mb-3">
                            <span>{article.date}</span>
                            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {article.readTime}</span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4 group-hover:text-moss transition-colors">
                            {article.title}
                        </h3>

                        <p className="text-charcoal/70 font-sans text-lg leading-relaxed mb-6 max-w-2xl">
                            {article.excerpt}
                        </p>

                        <Magnetic strength={10}>
                            <div className="inline-flex items-center gap-2 text-moss font-bold text-sm tracking-wide uppercase hover:text-moss-dark magnetic-button">
                                Читать исследование <ArrowRight className="w-4 h-4" />
                            </div>
                        </Magnetic>
                    </div>
                ))}

                {/* Regular Articles Stack */}
                <div className="flex flex-col gap-8 md:col-span-1">
                    {articles.filter(a => !a.featured).map(article => (
                        <div key={article.id} className="group cursor-pointer border-b border-charcoal/10 pb-8 last:border-0">
                            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4">
                                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-moss text-[10px] font-mono uppercase tracking-widest font-bold border border-moss/20 px-2 py-0.5 rounded-full">
                                    {article.category}
                                </span>
                            </div>

                            <h4 className="text-xl font-serif font-bold text-charcoal mb-2 group-hover:text-clay transition-colors leading-tight">
                                {article.title}
                            </h4>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest">{article.date}</span>
                                <span className="text-clay group-hover:translate-x-1 transition-transform">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Newsletter Block */}
            <div className="mt-20 glass bg-charcoal p-12 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-moss/20 rounded-full filter blur-[50px]"></div>

                <div className="relative z-10 max-w-xl">
                    <h3 className="text-3xl font-serif italic text-cream mb-4">Закрытая рассылка</h3>
                    <p className="text-cream/60 font-sans">
                        Инсайды визовых центров, статистика отказов и новые маршруты. Мы отправляем только алгоритмы и цифры, один раз в месяц.
                    </p>
                </div>

                <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                    <form className="flex w-full md:w-[400px]">
                        <input
                            type="email"
                            placeholder="architect@nura.health"
                            className="w-full px-6 py-4 rounded-l-full bg-cream/5 border border-white/10 text-cream placeholder:text-cream/30 focus:outline-none focus:border-moss/50 font-sans"
                        />
                        <button className="px-8 py-4 bg-moss text-cream font-bold font-sans rounded-r-full hover:bg-moss-dark transition-colors">
                            Доступ
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ArticleGrid;
