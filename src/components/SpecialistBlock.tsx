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
                    <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L.057 23.882l6.198-1.625A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.031-1.376l-.36-.214-3.733.979 1.001-3.656-.235-.376A9.862 9.862 0 012.106 12C2.106 6.54 6.54 2.106 12 2.106S21.894 6.54 21.894 12 17.46 21.894 12 21.894z"/>
                    </svg>
                        <span>Написать {s.name}</span>
                        <span className="text-t-strong group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SpecialistBlock;
