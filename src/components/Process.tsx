import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileEdit, ShieldCheck, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROTOCOLS = [
    {
        num: '01',
        title: 'Оставьте заявку',
        desc: 'Свяжитесь с нами онлайн или по телефону. Мы зададим пару вопросов, оценим ваши шансы и сразу скажем, какую визу лучше запрашивать.',
        icon: <FileEdit className="w-8 h-8 text-primary" />
    },
    {
        num: '02',
        title: 'Мы готовим документы',
        desc: 'Выдаём точный список под ваш случай. Сами делаем переводы, заполняем анкеты на иностранных языках, бронируем нужные билеты и отели для консульства.',
        icon: <ShieldCheck className="w-8 h-8 text-primary" />
    },
    {
        num: '03',
        title: 'Получаете визу',
        desc: 'Без нервов и очередей. Либо дистанционно (как в случае с Китаем и Индией), либо организуем для вас зелёный коридор на сдачу биометрии.',
        icon: <FileCheck className="w-8 h-8 text-primary" />
    }
];

const Process: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.process-card') as HTMLElement[];

        cards.forEach((card, index) => {
            if (index === cards.length - 1) return;

            gsap.to(card, {
                scale: 0.92,
                opacity: 0.4,
                filter: 'blur(8px)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 15%',
                    endTrigger: cards[index + 1],
                    end: 'top 40%',
                    scrub: true,
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section id="process" className="py-24 bg-sky-900 relative" ref={sectionRef}>
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 bg-hero-gradient mix-blend-multiply opacity-20" />

            <div className="max-w-4xl mx-auto px-5 relative z-10">
                <div className="text-center mb-16 lg:mb-24">
                    <h2 className="text-cta text-sm font-body font-bold tracking-widest uppercase mb-4">Как мы работаем</h2>
                    <h3 className="text-title text-white">Всего 3 простых шага</h3>
                </div>

                <div className="space-y-12 md:space-y-24">
                    {PROTOCOLS.map((protocol, index) => (
                        <div
                            key={index}
                            className="process-card sticky top-24 md:top-32 bg-white text-sky-900 rounded-[2rem] p-8 md:p-12 shadow-2xl origin-top"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                {/* Left Side: Number & Icon */}
                                <div className="flex-shrink-0 flex md:flex-col items-center gap-4 md:w-32">
                                    <div className="text-5xl md:text-7xl font-sans font-black text-sky-100 italic">
                                        {protocol.num}
                                    </div>
                                    <div className="hidden md:flex w-16 h-16 rounded-full bg-sky-50 items-center justify-center border border-sky-100">
                                        {protocol.icon}
                                    </div>
                                </div>

                                {/* Right Side: Content */}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-4 mb-4 md:hidden">
                                        <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center border border-sky-100">
                                            {protocol.icon}
                                        </div>
                                    </div>

                                    <h4 className="text-2xl lg:text-3xl font-heading mb-4 text-sky-900">
                                        {protocol.title}
                                    </h4>

                                    <p className="text-sky-700/80 text-lg md:text-xl font-body font-light leading-relaxed">
                                        {protocol.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[15vh]"></div>
        </section>
    );
};

export default Process;
