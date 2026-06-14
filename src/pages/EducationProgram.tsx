import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EDUCATION_DATA } from '../data/education';
import { ModalContext } from '../layouts/RootLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import SpecialistBlock from '../components/SpecialistBlock';
import { Calendar, CheckCircle2, GraduationCap, School, Users, XCircle, ChevronRight } from 'lucide-react';

const EducationProgram: React.FC = () => {
    const { program: programId } = useParams<{ program: string }>();
    const navigate = useNavigate();
    const { openLeadModal } = useContext(ModalContext);

    const program = EDUCATION_DATA.find(p => p.id === programId);

    if (!program) {
        return (
            <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-6 text-center">
                <SEO title="Программа не найдена" description="Запрошенное учебное направление отсутствует." />
                <GraduationCap className="text-t-accent mb-4 animate-spin-slow" size={48} />
                <h1 className="text-2xl font-heading text-t-text mb-2">Программа не найдена</h1>
                <p className="text-t-muted text-sm max-w-sm mb-6">
                    Направление временно недоступно или находится на обновлении.
                </p>
                <button onClick={() => navigate('/education')} className="btn-premium">
                    Назад к программам
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent">
            <SEO
                title={`${program.title} — Обучение за рубежом`}
                description={`${program.description.substring(0, 150)}...`}
                canonical={`/education/${program.id}`}
            />
            <Breadcrumbs />

            {/* Hero Section */}
            <div className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden shrink-0">
                <img
                    src={program.image}
                    alt={program.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-dark via-obsidian-dark/40 to-obsidian-dark/30 z-10" />

                <div className="absolute inset-0 z-20 flex items-end">
                    <div className="max-w-7xl mx-auto w-full px-6 pb-12 md:pb-16">
                        <button
                            onClick={() => navigate('/education')}
                            className="text-champagne/80 hover:text-champagne font-mono text-xs uppercase tracking-wider mb-6 flex items-center gap-1.5 transition-colors group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Все программы
                        </button>

                        <div className="flex items-center gap-3 mb-4 flex-wrap text-champagne/90">
                            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
                                <Users size={14} />
                                <span>{program.age}</span>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-champagne/45"></span>
                            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
                                <Calendar size={14} />
                                <span>{program.dates}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 tracking-tight leading-[1.05] drop-shadow-lg">
                            {program.title}
                        </h1>

                        <div className="flex items-center gap-2 text-champagne/90 text-sm font-mono uppercase tracking-wider mb-2">
                            <School size={16} />
                            <span>Партнер: {program.partner}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left side */}
                <div className="lg:col-span-2">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading text-t-text mb-6 tracking-tight">
                            О программе
                        </h2>
                        <p className="text-t-muted text-base md:text-lg leading-relaxed font-sans font-light">
                            {program.description}
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {program.features.map((feat, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-t-border bg-t-card shadow-md">
                                <h3 className="text-t-strong font-heading font-medium text-lg mb-2">
                                    {feat.title}
                                </h3>
                                <p className="text-t-subtle text-xs md:text-sm leading-relaxed font-sans font-light">
                                    {feat.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Exclusions/Inclusions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-t-border pt-12">
                        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-6 md:p-8">
                            <h3 className="text-t-text font-heading text-xl mb-5 flex items-center gap-2">
                                <CheckCircle2 className="text-emerald-500" size={22} />
                                В стоимость включено
                            </h3>
                            <ul className="space-y-3">
                                {program.included.map((item, i) => (
                                    <li key={i} className="flex gap-2 text-xs md:text-sm text-t-muted items-start font-sans font-light leading-relaxed">
                                        <span className="text-emerald-500 mt-1 shrink-0">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-rose-500/5 border border-rose-500/15 rounded-2xl p-6 md:p-8">
                            <h3 className="text-t-text font-heading text-xl mb-5 flex items-center gap-2">
                                <XCircle className="text-rose-500" size={22} />
                                Не включено / Дополнительно
                            </h3>
                            <ul className="space-y-3">
                                {program.notIncluded.map((item, i) => (
                                    <li key={i} className="flex gap-2 text-xs md:text-sm text-t-muted items-start font-sans font-light leading-relaxed">
                                        <span className="text-rose-500 mt-1 shrink-0">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20 bg-t-card border border-t-border rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-t-strong" />

                        <div className="mb-6">
                            <span className="font-mono text-t-text/50 text-[10px] tracking-widest uppercase block mb-1">Ориентировочная стоимость</span>
                            <div className="text-3xl md:text-4xl font-heading font-bold text-t-text tracking-tight mb-2">
                                {program.price}
                            </div>
                            <p className="text-t-subtle text-xs leading-relaxed font-sans font-light">
                                Оплата производится в рублях по курсу на день оплаты. Помогаем с оформлением рассрочки.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={openLeadModal}
                                className="btn-card btn-card-primary justify-center py-4 rounded-xl w-full flex items-center gap-2"
                            >
                                <span>Подать заявку</span>
                                <ChevronRight size={16} />
                            </button>
                            <a
                                href="https://wa.me/+79141589504"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-card btn-card-secondary justify-center py-4 rounded-xl w-full flex items-center gap-2 border border-t-border"
                            >
                                <span>Задать вопрос в WhatsApp</span>
                            </a>
                        </div>

                        <div className="border-t border-t-border mt-6 pt-6 text-t-muted text-xs leading-relaxed font-sans font-light">
                            <strong>Важная информация:</strong> Оформление долгосрочных студенческих виз (X1) занимает от 4 до 8 недель. Рекомендуем подавать документы не позднее, чем за 3 месяца до начала учебы.
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">
                <SpecialistBlock type="china" />
            </div>
        </div>
    );
};

export default EducationProgram;
