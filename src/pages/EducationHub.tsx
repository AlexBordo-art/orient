import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { GraduationCap, ArrowRight } from 'lucide-react';

const PROGRAMS = [
    { slug: 'abroad', name: 'Образование за рубежом', icon: '🎓', desc: 'Университеты Китая, Кореи и Европы. Программы бакалавриата, магистратуры и стажировки.' },
    { slug: 'languages', name: 'Языковые школы', icon: '🌍', desc: 'Языковые курсы за рубежом: китайский, корейский, английский. Все уровни, от начального до продвинутого.' },
];

const EducationHub: React.FC = () => (
    <div className="min-h-screen bg-t-bg">
        <SEO
            title="Образование за рубежом"
            description="Обучение в университетах Китая, Кореи и Европы. Языковые курсы за рубежом. Помощь с поступлением, документами и визами от Ориент Экспресс."
            canonical="/education"
            keywords="образование за рубежом, учеба в Китае, языковые курсы, обучение в Корее"
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
                    Образование <br />
                    <span className="text-t-accent italic">без границ</span>
                </h1>
                <p className="text-t-muted text-lg max-w-2xl leading-relaxed">
                    Мы подбираем программы, помогаем с документами и визами,
                    обеспечиваем сопровождение на всех этапах поступления.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROGRAMS.map(prog => (
                    <Link
                        key={prog.slug}
                        to={`/education/${prog.slug}`}
                        className="group relative p-8 rounded-2xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-500"
                    >
                        <div className="text-5xl mb-6">{prog.icon}</div>
                        <h3 className="text-t-text font-semibold text-xl mb-3 group-hover:text-t-strong transition-colors">{prog.name}</h3>
                        <p className="text-t-subtle text-sm leading-relaxed mb-6">{prog.desc}</p>
                        <div className="flex items-center gap-2 text-t-accent opacity-60 text-sm group-hover:text-t-strong group-hover:opacity-100 transition-colors">
                            <span>Подробнее</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default EducationHub;
