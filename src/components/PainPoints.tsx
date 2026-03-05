import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileQuestion, XOctagon, Clock3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PAIN_POINTS = [
    {
        icon: <FileQuestion className="w-8 h-8 text-primary" />,
        title: "Не знаете, какие документы нужны?",
        desc: "Гуглите списки, звоните в визовые центры, но требования постоянно меняются. Страшно принести не ту справку и потерять сбор.",
        solution: "Даём точный, актуальный на сегодня список конкретно под вашу цель поездки."
    },
    {
        icon: <XOctagon className="w-8 h-8 text-cta" />,
        title: "Боитесь получить отказ?",
        desc: "Отказ портит визовую историю навсегда. Особенно сейчас, когда консульства присматриваются к каждому штампу.",
        solution: "Готовим документы так, чтобы комар носа не подточил. У нас 98% одобрений."
    },
    {
        icon: <Clock3 className="w-8 h-8 text-sky-600" />,
        title: "Нет времени на очереди?",
        desc: "Запись в консульство, поездки в другой город, часы ожидания в визовом центре — всё это отнимает кучу нервов.",
        solution: "Вам нужен только паспорт. Остальную логистику мы полностью берём на себя."
    }
];

const PainPoints: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = cardsRef.current?.children;
        if (!cards) return;

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section className="section bg-white" id="painpoints" ref={sectionRef}>
            <div className="container-main">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-title mb-6">Знакомая ситуация?</h2>
                    <p className="text-lg text-sky-800/70 font-light">
                        Оформление визы часто превращается в лотерею. Мы знаем все подводные камни и берём риски на себя, чтобы вы могли просто собирать чемоданы.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={cardsRef}>
                    {PAIN_POINTS.map((item, idx) => (
                        <div key={idx} className="card group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold font-body text-sky-900 mb-4">{item.title}</h3>
                            <p className="text-sky-700/80 mb-6 font-light">{item.desc}</p>

                            <div className="pt-6 border-t border-sky-100 mt-auto">
                                <p className="font-medium text-sky-900 flex gap-2 items-start">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>{item.solution}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
