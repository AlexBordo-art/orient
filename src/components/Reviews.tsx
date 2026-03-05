import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
    {
        platform: '2GIS',
        rating: 4.8,
        count: '150+',
        link: 'https://2gis.ru/khabarovsk/firm/4926340373575901/tab/reviews',
        desc: 'Проверенные отзывы от реальных клиентов Дальнего Востока',
    },
    {
        platform: 'Яндекс Карты',
        rating: 4.9,
        count: '120+',
        link: 'https://yandex.ru/maps/org/oriyent_ekspress/1032200453/reviews/?ll=135.084206%2C48.484451&z=15',
        desc: 'Ежедневные оценки работы нашего визового бутика',
    }
];

const Reviews: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

        tl.from(".review-header", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
            .from(".review-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            }, "-=0.4");
    }, { scope: sectionRef });

    return (
        <section id="reviews" className="section bg-sky-50 relative overflow-hidden" ref={sectionRef}>
            <div className="container-main relative z-10">
                <div className="text-center mb-16 review-header">
                    <h2 className="text-cta text-sm font-body font-bold tracking-widest uppercase mb-4">Социальное доказательство</h2>
                    <h3 className="text-title text-sky-900 mb-6 font-heading">Оформляем визы с 2010 года</h3>
                    <p className="text-sky-800/70 max-w-2xl mx-auto font-body text-lg font-light">
                        Мы не публикуем избранные отзывы на сайте. Мы гордимся своей открытой репутацией на независимых площадках, где каждый может оценить нашу работу.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" ref={containerRef}>
                    {REVIEWS.map((review, i) => (
                        <div key={i} className="review-card card bg-white flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center space-x-3">
                                        <h4 className="text-2xl font-body font-bold text-sky-900">{review.platform}</h4>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <div className="flex items-center space-x-1 text-cta mb-1">
                                            <span className="text-xl font-bold text-sky-900 mr-2">{review.rating}</span>
                                            <Star className="w-5 h-5 fill-current" />
                                        </div>
                                        <div className="text-xs font-body text-sky-600 uppercase tracking-widest">{review.count} отзывов</div>
                                    </div>
                                </div>

                                <p className="text-sky-800/80 font-body mb-8 font-light text-lg">
                                    {review.desc}
                                </p>
                            </div>

                            <Magnetic strength={15}>
                                <a
                                    href={review.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-ghost w-full justify-center group"
                                >
                                    <span>Читать все отзывы</span>
                                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Magnetic>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-cta/5 rounded-full blur-[80px] -translate-y-1/2"></div>
        </section>
    );
};

export default Reviews;
