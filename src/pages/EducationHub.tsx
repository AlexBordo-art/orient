import React from 'react';
import { Link } from 'react-router-dom';
import { EDUCATION_DATA } from '../data/education';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { GraduationCap, ArrowRight, Users } from 'lucide-react';

const EducationHub: React.FC = () => (
    <div className="min-h-screen bg-transparent">
        <SEO
            title="Образование за рубежом — Языковые лагеря и гранты"
            description="Обучение в университетах Китая. Языковые лагеря в Шанхае и Пекине. Помощь с получением государственных грантов и поступлением от Ориент Экспресс."
            canonical="/education"
            keywords="образование за рубежом, учеба в Китае, языковые курсы, летний лагерь Шанхай, гранты в Китай"
        />
        <Breadcrumbs />
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center">
                        <GraduationCap className="text-t-strong" size={24} />
                    </div>
                    <span className="text-t-accent text-sm font-mono tracking-widest uppercase opacity-60">Образование</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-t-text mb-6 tracking-tight">
                    Инвестируйте <br />
                    <span className="text-t-accent italic">в будущее образование</span>
                </h1>
                <p className="text-t-muted text-lg max-w-2xl leading-relaxed">
                    Мы подбираем перспективные учебные программы в Азии, организуем поездки под ключ,
                    помогаем получить правительственные гранты и гарантируем полную безопасность.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EDUCATION_DATA.map(prog => (
                    <Link
                        key={prog.id}
                        to={`/education/${prog.id}`}
                        className="group relative flex flex-col justify-between p-8 rounded-2xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500 shadow-xl"
                    >
                        <div>
                            {/* Card Image */}
                            <div className="h-44 w-full rounded-xl overflow-hidden mb-6 relative">
                                <img
                                    src={prog.image}
                                    alt={prog.title}
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-t-strong bg-t-bg/95 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    {prog.price}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-t-strong/80 uppercase tracking-wider">
                                <Users size={12} />
                                <span>{prog.age}</span>
                            </div>

                            <h3 className="text-t-text font-heading font-medium text-xl lg:text-2xl mb-3 group-hover:text-t-strong transition-colors leading-tight">
                                {prog.title}
                            </h3>
                            <p className="text-t-subtle text-xs font-sans font-light leading-relaxed mb-6">
                                {prog.description.length > 130 ? `${prog.description.substring(0, 130)}...` : prog.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-t-accent text-xs font-mono tracking-widest uppercase mt-4 group-hover:text-t-strong transition-colors border-t border-t-border/50 pt-4">
                            <span>Подробнее о программе</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default EducationHub;
