import React from 'react';

interface Specialist {
    name: string;
    region: string;
    quote: string;
    facts: string[];
    bgImage: string;
    whatsapp: string;
}

const SPECIALISTS: Record<string, Specialist> = {
    china: {
        name: 'Инна',
        region: 'Эксперт по Китаю и Японии',
        quote: '«За последние три года я лично объехала 8 провинций Китая. Знаю, где горы Аватара выглядят так, как на фото, а где — нет.»',
        facts: ['10 лет в направлении', '200+ организованных поездок', 'Лично была в Чжанцзяцзе, Чэнду, Юньнани, Сычуани'],
        bgImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1200',
        whatsapp: '+79141589504',
    },
    visa: {
        name: 'Светлана',
        region: 'Эксперт по визовым вопросам',
        quote: '«Нет документа, который нельзя правильно подготовить. Каждый отказ — это просто неправильно собранный пакет. Мы не допускаем отказов.»',
        facts: ['12 лет в визовом деле', '15 000+ оформленных виз', 'Аккредитация посольств Китая, Кореи, ЕС'],
        bgImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200',
        whatsapp: '+79164665606',
    },
};

interface SpecialistBlockProps {
    type: 'china' | 'visa';
}

const SpecialistBlock: React.FC<SpecialistBlockProps> = ({ type }) => {
    const s = SPECIALISTS[type];

    return (
        <div className="mt-20 glass-card p-6 md:p-10 lg:p-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Portrait frame — small, framed, hairline accent */}
                <div className="shrink-0 mx-auto md:mx-0">
                    <div className="relative w-[180px] md:w-[200px] aspect-[4/5] rounded-2xl overflow-hidden">
                        <img
                            src={s.bgImage}
                            alt={s.name}
                            className="w-full h-full object-cover grayscale-[0.15]"
                        />
                        <div className="absolute inset-0 rounded-2xl border border-t-strong/30 pointer-events-none" />
                    </div>
                    <div className="hairline mt-5 mx-auto md:mx-0" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <span className="mono-sm text-t-accent opacity-60 block mb-5">
                        Ваш личный эксперт
                    </span>

                    <div className="mb-5">
                        <h3 className="font-heading text-4xl md:text-5xl text-t-text font-light tracking-tight mb-1">
                            {s.name}
                        </h3>
                        <p className="text-t-accent opacity-80 text-sm font-mono tracking-wide">{s.region}</p>
                    </div>

                    <blockquote className="text-t-text text-lg md:text-xl font-heading font-light italic leading-relaxed mb-7 border-l-2 border-t-strong/50 pl-5">
                        {s.quote}
                    </blockquote>

                    <ul className="flex flex-col gap-2 mb-7">
                        {s.facts.map((fact, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-t-muted">
                                <span className="w-1 h-1 rounded-full bg-t-strong shrink-0" />
                                {fact}
                            </li>
                        ))}
                    </ul>

                    <a
                        href={`https://wa.me/${s.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-t-glass hover:bg-t-card border border-t-border hover:border-t-strong/60 rounded-full text-t-text text-sm font-mono tracking-wide transition-all duration-300 group"
                    >
                        <span>Написать {s.name}</span>
                        <span className="text-t-strong group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SpecialistBlock;
