import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface StickyGridFunnelProps {
    onOpenModal: () => void;
}

const StickyGridFunnel: React.FC<StickyGridFunnelProps> = ({ onOpenModal }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=4000", // 4 viewport heights of scrolling to get through the story
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    anticipatePin: 1
                }
            });

            // Initial state: hide everything except Hook
            gsap.set('.card-pain, .card-solution, .card-product, .card-cta', {
                y: '100vh',
                opacity: 0,
                scale: 0.8
            });

            // Step 1 -> 2: Bring in Pain card, shrink Hook slightly
            tl.to('.card-hook', { scale: 0.95, opacity: 0.5, duration: 1 })
                .to('.card-pain', { y: 0, opacity: 1, scale: 1, duration: 1 }, "<");

            // Step 2 -> 3: Bring in Solution card
            tl.to('.card-pain', { scale: 0.95, opacity: 0.5, duration: 1 })
                .to('.card-solution', { y: 0, opacity: 1, scale: 1, duration: 1 }, "<");

            // Step 3 -> 4: Bring in Products (Staggered)
            tl.to('.card-solution', { scale: 0.95, opacity: 0.5, duration: 1 })
                .to('.card-product', { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2 }, "<");

            // Step 4 -> 5: Bring in CTA, fade Products slightly
            tl.to('.card-product', { opacity: 0.7, duration: 1 })
                .to('.card-cta', { y: 0, opacity: 1, scale: 1, duration: 1 }, "<");

        }, containerRef);
        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="h-screen w-full relative overflow-hidden bg-obsidian text-white flex items-center justify-center p-4 lg:p-12">

            <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">

                {/* 1. HOOK (Large Image) */}
                <div className="card-hook absolute inset-0 md:relative md:w-1/2 h-[80vh] rounded-3xl overflow-hidden glass-panel z-10">
                    <img
                        src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1200"
                        alt="Paris"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-dark/90 via-obsidian-dark/30 to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10">
                        <h2 className="text-4xl md:text-6xl font-heading font-normal italic text-champagne leading-tight">
                            Ваше идеальное
                            <br />путешествие начинается
                            <br /><span className="text-white">здесь.</span>
                        </h2>
                    </div>
                </div>

                <div className="w-full md:w-1/2 h-[80vh] relative z-20 flex flex-col gap-4">

                    {/* 2. PAIN */}
                    <div className="card-pain absolute inset-0 md:inset-auto md:relative w-full h-1/2 glass-dark p-8 md:p-10 flex flex-col justify-center border border-red-900/30">
                        <ShieldAlert className="text-red-400 w-12 h-12 mb-6" />
                        <h3 className="text-2xl font-sans font-bold mb-4">Самостоятельное оформление — это риск.</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Отказы в визе? Очереди в посольствах? Потерянные деньги на невозвратных авиабилетах? Бюрократия убивает радость поездки.
                        </p>
                    </div>

                    {/* 3. SOLUTION */}
                    <div className="card-solution absolute inset-0 md:inset-auto md:relative w-full h-1/2 bg-champagne text-obsidian-dark rounded-3xl p-8 md:p-10 flex flex-col justify-center shadow-[0_0_50px_rgba(212,175,55,0.15)]">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="w-8 h-8" />
                            <span className="font-mono text-sm uppercase tracking-widest font-bold">Наше решение</span>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-5xl font-heading font-bold mb-2">17</div>
                                <div className="text-sm font-medium opacity-80">Лет опыта в travel-сфере</div>
                            </div>
                            <div>
                                <div className="text-5xl font-heading font-bold mb-2">99%</div>
                                <div className="text-sm font-medium opacity-80">Одобрений сложных кейсов</div>
                            </div>
                        </div>
                    </div>

                    {/* 4. PRODUCTS (Cards grid overlay) */}
                    <div className="absolute inset-0 z-30 grid grid-cols-2 gap-4 pointer-events-none">
                        <div className="card-product col-span-2 glass-panel p-6 flex justify-between items-center pointer-events-auto hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/visas')}>
                            <div>
                                <h4 className="text-xl font-bold text-champagne mb-1">Визовый Бутик</h4>
                                <p className="text-sm text-slate-400">Азия, Европа, CША, АТЭС</p>
                            </div>
                            <ArrowRight className="text-champagne" />
                        </div>
                        <div className="card-product glass-panel p-6 flex flex-col justify-between pointer-events-auto hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/tours')}>
                            <h4 className="text-lg font-bold mb-2">Приватные Туры</h4>
                            <ArrowRight className="self-end" />
                        </div>
                        <div className="card-product glass-panel p-6 flex flex-col justify-between pointer-events-auto hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/education')}>
                            <h4 className="text-lg font-bold mb-2">Академическая Интеграция</h4>
                            <ArrowRight className="self-end" />
                        </div>

                        {/* 5. CTA */}
                        <div className="card-cta col-span-2 relative mt-4 pointer-events-auto">
                            <div className="absolute inset-0 bg-champagne filter blur-xl opacity-20 rounded-full"></div>
                            <button
                                onClick={onOpenModal}
                                className="w-full btn-premium py-6 rounded-3xl text-xl font-bold"
                            >
                                Экспертный разбор кейса
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default StickyGridFunnel;
