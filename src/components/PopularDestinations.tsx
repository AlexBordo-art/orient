import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DESTINATIONS = [
    {
        id: 1,
        title: 'Китай',
        desc: 'Бизнес и инновации',
        image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        title: 'Япония',
        desc: 'Традиции и технологии',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        title: 'Южная Корея',
        desc: 'Культура и ритм',
        image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 4,
        title: 'Сингапур',
        desc: 'Будущее уже здесь',
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800'
    }
];

const PopularDestinations: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="section-padding relative z-10">
            <div className="container-main">
                <div ref={headerRef} className="text-center mb-16 flex flex-col items-center">
                    <h3 className="text-t-strong text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 font-mono">
                        Популярные направления
                    </h3>
                    <p className="text-t-muted font-sans font-light text-lg md:text-xl max-w-2xl text-center">
                        Синтез лучших точек для бизнес-интервенций и премиального отдыха.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DESTINATIONS.map((dest, i) => (
                        <div
                            key={dest.id}
                            ref={el => { cardsRef.current[i] = el; }}
                            className="group relative h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden cursor-pointer"
                        >
                            {/* Image */}
                            <img
                                src={dest.image}
                                alt={dest.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-t-bg/90 via-t-bg/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <h4 className="text-3xl font-heading font-semibold text-t-text mb-1">{dest.title}</h4>
                                <p className="text-t-muted font-sans font-light text-sm mb-6">{dest.desc}</p>

                                {/* Action Button that slides up */}
                                <div className="overflow-hidden">
                                    <span className="inline-flex items-center gap-2 text-t-strong text-xs font-bold font-mono tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        Исследовать
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>

                            {/* Border interaction */}
                            <div className="absolute inset-0 border border-white/10 group-hover:border-champagne/40 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularDestinations;
