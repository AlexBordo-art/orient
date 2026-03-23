import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import Magnetic from './Magnetic';
import KineticTitle from './KineticTitle';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
    {
        platform: '2GIS',
        rating: 4.8,
        count: '150+',
        link: 'https://2gis.ru/khabarovsk/firm/4926340373575901/tab/reviews',
        desc: 'Проверенные отзывы от реальных клиентов. Высокая оценка качества услуг и клиентского сервиса.',
    },
    {
        platform: 'Яндекс Карты',
        rating: 4.9,
        count: '120+',
        link: 'https://yandex.ru/maps/org/oriyent_ekspress/1032200453/reviews/?ll=135.084206%2C48.484451&z=15',
        desc: 'Ежедневные оценки работы нашего визового бутика. Мы ценим каждый отзыв.',
    }
];

const Reviews: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        tl.from(".review-card", {
            y: 60,
            opacity: 0,
            rotationX: -15, // 3D effect
            transformPerspective: 1000,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.6");
    }, { scope: sectionRef });

    return (
        <section id="reviews" className="section-padding relative overflow-hidden z-10" ref={sectionRef}>
            <div className="container-main relative z-10">
                <div className="text-center mb-16 lg:mb-24 flex flex-col items-center review-header">
                    <h3 className="text-t-strong text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 font-mono">
                        Социальное доказательство
                    </h3>
                    <KineticTitle
                        text="Репутация без компромиссов"
                        tag="h2"
                        className="text-t-text text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-center mb-6"
                    />
                    <p className="text-t-muted font-sans font-light text-lg md:text-xl max-w-2xl text-center">
                        Мы гордимся своей открытой репутацией на независимых площадках, где каждый может оценить уровень нашей экспертизы.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto" ref={containerRef}>
                    {REVIEWS.map((review, i) => (
                        <div key={i} className="review-card glass-panel p-8 md:p-10 flex flex-col justify-between group">

                            {/* Inner glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-champagne/0 to-sapphire/0 group-hover:from-champagne/5 group-hover:to-sapphire/5 rounded-3xl transition-all duration-700 pointer-events-none" />

                            <div>
                                <div className="flex justify-between items-start mb-10">
                                    <div className="flex items-center space-x-3">
                                        <h4 className="text-3xl font-heading font-medium text-t-text">{review.platform}</h4>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <div className="flex items-center space-x-2 text-t-strong mb-1">
                                            <span className="text-2xl font-bold font-mono tracking-tighter">{review.rating}</span>
                                            <Star className="w-5 h-5 fill-current" />
                                        </div>
                                        <div className="text-[10px] font-mono text-t-muted uppercase tracking-widest">{review.count} отзывов</div>
                                    </div>
                                </div>

                                <p className="text-t-muted font-sans font-light text-lg leading-relaxed mb-10">
                                    "{review.desc}"
                                </p>
                            </div>

                            <Magnetic strength={0.3}>
                                <a
                                    href={review.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-ghost-premium w-full justify-center group/btn"
                                >
                                    <span className="font-mono text-xs font-bold tracking-widest uppercase">Ознакомиться</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </Magnetic>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ambient gradients */}
            <div className="absolute top-1/2 left-0 w-[50vh] h-[50vh] bg-sapphire/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[50vh] h-[50vh] bg-champagne/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default Reviews;
