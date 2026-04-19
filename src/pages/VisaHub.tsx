import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import SpecialistBlock from '../components/SpecialistBlock';
import { Stamp, ArrowRight } from 'lucide-react';

type Country = {
    slug: string; name: string; display?: string; code: string; ghost: string;
    // Per-glyph offset tuning (Thai/Devanagari have tall top marks → visually float high)
    ghostNudge?: { right?: string; bottom?: string };
};

// ghost = native-script character, used as oversized watermark behind card content
// display = short name for card (name stays full for SEO / page titles)
const PRIMARY: Country[] = [
    { slug: 'china',    name: 'Китай',           code: 'CN', ghost: '中' },
    { slug: 'korea',    name: 'Южная Корея',     display: 'Корея',  code: 'KR', ghost: '韓' },
    { slug: 'thailand', name: 'Таиланд',         code: 'TH', ghost: 'ไ', ghostNudge: { right: '0.05em', bottom: '-0.1em' } },
    { slug: 'schengen', name: 'Шенгенская зона', display: 'Шенген', code: 'EU', ghost: 'E', ghostNudge: { right: '0.05em', bottom: '-0.2em' } },
];

const SECONDARY: Country[] = [
    { slug: 'singapore', name: 'Сингапур',  code: 'SG', ghost: '星' },
    { slug: 'india',     name: 'Индия',     code: 'IN', ghost: 'भ', ghostNudge: { bottom: '-0.5em' } },
    { slug: 'bulgaria',  name: 'Болгария',  code: 'BG', ghost: 'Б' },
    { slug: 'cyprus',    name: 'Кипр',      code: 'CY', ghost: 'Κ' },
];

const PrimaryCard: React.FC<{ country: Country }> = ({ country }) => (
    <Link
        to={`/visas/${country.slug}`}
        className="group relative p-6 rounded-2xl border border-t-border bg-t-card hover:border-t-strong/40 transition-all duration-500 flex flex-col overflow-hidden min-h-[240px]"
    >
        {/* Ghost watermark */}
        <span
            aria-hidden="true"
            className="absolute font-heading select-none pointer-events-none transition-all duration-700 group-hover:scale-110"
            style={{
                right: country.ghostNudge?.right ?? '-0.15em',
                bottom: country.ghostNudge?.bottom ?? '-0.35em',
                fontSize: '14rem',
                lineHeight: 1,
                color: 'var(--color-accent-strong)',
                opacity: 0.06,
                fontWeight: 400,
            }}
        >
            {country.ghost}
        </span>

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-5">
                <div className="inline-flex items-center justify-center w-14 h-8 rounded border border-t-strong/30 bg-t-glass">
                    <span className="font-mono text-[11px] font-bold text-t-strong tracking-[0.15em]">{country.code}</span>
                </div>
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-t-subtle">популярное</span>
            </div>

            <h3 className="text-t-text font-heading font-semibold text-xl xl:text-2xl mb-4 group-hover:text-t-strong transition-colors">
                {country.display ?? country.name}
            </h3>

            <div className="flex items-center gap-2 text-t-accent text-sm group-hover:text-t-strong transition-colors mt-auto">
                <span>Подробнее</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </Link>
);

const SecondaryCard: React.FC<{ country: Country }> = ({ country }) => (
    <Link
        to={`/visas/${country.slug}`}
        className="group relative flex items-center justify-between p-4 rounded-xl border border-t-border bg-t-card hover:border-t-strong/30 transition-all duration-300 overflow-hidden"
    >
        {/* Ghost watermark */}
        <span
            aria-hidden="true"
            className="absolute font-heading select-none pointer-events-none transition-all duration-700 group-hover:scale-110"
            style={{
                right: country.ghostNudge?.right ?? '-0.1em',
                bottom: country.ghostNudge?.bottom ?? '-0.35em',
                fontSize: '6rem',
                lineHeight: 1,
                color: 'var(--color-accent-strong)',
                opacity: 0.05,
                fontWeight: 400,
            }}
        >
            {country.ghost}
        </span>

        <div className="relative z-10 flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-11 h-7 rounded border border-t-strong/25 bg-t-glass">
                <span className="font-mono text-[10px] font-bold text-t-strong tracking-[0.15em]">{country.code}</span>
            </div>
            <span className="text-t-text font-heading text-base group-hover:text-t-strong transition-colors">
                {country.display ?? country.name}
            </span>
        </div>
        <ArrowRight size={14} className="relative z-10 text-t-subtle group-hover:text-t-strong group-hover:translate-x-1 transition-all" />
    </Link>
);

const VisaHub: React.FC = () => {
    return (
        <div className="min-h-screen bg-transparent">
            <SEO
                title="Оформление виз — Визовый центр"
                description="Визовый центр Ориент Экспресс: визы в Китай, Корею, Таиланд, Шенген, Сингапур, Индию, Болгарию, Кипр."
                canonical="/visas"
                keywords="оформление виз, виза в Китай, виза в Корею, шенгенская виза, визовый центр Хабаровск"
            />
            <Breadcrumbs />
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-t-strong/10 border border-t-strong/20 flex items-center justify-center">
                            <Stamp className="text-t-strong" size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-t-strong text-xs font-mono tracking-[0.3em] uppercase">Визовый Центр</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-t-text mb-6 tracking-tight">
                        Оформление виз <br />
                        <span className="text-t-accent italic">без бюрократии</span>
                    </h1>
                    <p className="text-t-muted text-lg max-w-2xl leading-relaxed">
                        Мы берём весь процесс на себя — от аудита документов до подачи.
                        Офисы в Хабаровске и Москве.
                    </p>
                </div>

                {/* Primary destinations */}
                <div className="mb-16">
                    <div className="flex items-baseline justify-between mb-6">
                        <h2 className="font-heading text-2xl text-t-text">Основные направления</h2>
                        <span className="hairline hidden md:block flex-1 ml-6"></span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PRIMARY.map(c => <PrimaryCard key={c.slug} country={c} />)}
                    </div>
                </div>

                {/* Secondary destinations */}
                <div className="mb-16">
                    <div className="flex items-baseline justify-between mb-6">
                        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-t-subtle">Также оформляем</h2>
                        <span className="hairline hidden md:block flex-1 ml-6"></span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {SECONDARY.map(c => <SecondaryCard key={c.slug} country={c} />)}
                    </div>
                </div>

                <SpecialistBlock type="visa" />
            </div>
        </div>
    );
};

export default VisaHub;
