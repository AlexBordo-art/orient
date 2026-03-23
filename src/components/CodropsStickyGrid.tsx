import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PricingSection from './PricingSection';
import ContactSection from './ContactSection';
import Magnetic from './Magnetic';
import ExperienceFinder from './ExperienceFinder';

const IMAGES = [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=90&w=1200", // Tokyo
    "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=90&w=1200", // Dubai
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=90&w=1200", // Rome
];

interface CodropsStickyGridProps {
    onOpenModal: () => void;
}

const CodropsStickyGrid: React.FC<CodropsStickyGridProps> = ({ onOpenModal }) => {
    const [layer, setLayer] = useState(0);

    // Global wheel, touch, and keyboard handler to control the spatial transition
    useEffect(() => {
        let lastActionTime = 0;
        const DEBOUNCE_MS = 900; // slightly longer than the 800ms transition

        // Function to handle moving forward (down/next)
        const goNext = () => {
            const now = Date.now();
            if (now - lastActionTime < DEBOUNCE_MS) return;
            setLayer(l => Math.min(l + 1, 3));
            lastActionTime = now;
        };

        // Function to handle moving backward (up/prev)
        const goPrev = () => {
            const now = Date.now();
            if (now - lastActionTime < DEBOUNCE_MS) return;
            setLayer(l => Math.max(l - 1, 0));
            lastActionTime = now;
        };

        // Wheel Event Handler
        const handleWheel = (e: WheelEvent) => {
            // e.deltaY > 0 -> scrolling down (moving forward in layers)
            if (e.deltaY > 30) {
                goNext();
            } else if (e.deltaY < -30) {
                goPrev();
            }
        };

        // Keyboard Event Handler
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
                e.preventDefault(); // Prevent native scroll even if overflow is not caught
                goNext();
            } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
                e.preventDefault();
                goPrev();
            }
        };

        // Touch Event Handlers
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            if (Math.abs(deltaY) > 50) {
                if (deltaY > 0) { // swipe up = scroll down = next layer
                    goNext();
                } else {
                    goPrev();
                }
            }

            // Prevent actual scrolling to maintain single-page spatial feel
            if (e.cancelable) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    // Helper: inline styles for smooth spatial transitions
    const getLayerStyle = (index: number): React.CSSProperties => {
        const diff = index - layer;
        if (diff === 0) {
            return { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)', pointerEvents: 'auto', zIndex: 20 };
        } else if (diff > 0) {
            // Below: slide up from bottom
            return { opacity: 0, transform: `translateY(${diff * 60}px) scale(0.96)`, filter: 'blur(12px)', pointerEvents: 'none', zIndex: 0 };
        } else {
            // Above: slide up and fade
            return { opacity: 0, transform: `translateY(${diff * 80}px) scale(1.03)`, filter: 'blur(8px)', pointerEvents: 'none', zIndex: 0 };
        }
    };

    return (
        <div className="bg-transparent text-t-text font-sans selection:bg-t-strong selection:text-t-bg relative w-full h-[100dvh] md:h-screen overflow-hidden perspective-[2000px]">

            {/* LAYER 0: The Portal Entry (Genesis) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ ...getLayerStyle(0), transition: 'all 800ms cubic-bezier(0.22, 1, 0.36, 1)' }}>

                {/* Trust badge — "С 2007 года" */}
                <div className="mb-6 flex items-center gap-2 bg-t-glass border border-t-strong/20 rounded-full px-5 py-2 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-t-strong animate-pulse"></span>
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-t-strong/80">С 2007 года · Хабаровск · Москва</span>
                </div>

                <h1 className="font-heading text-6xl md:text-9xl text-t-text font-bold tracking-tighter mb-4 text-center leading-[1.05]">
                    Orient Express
                </h1>

                {/* Value prop */}
                <p className="font-sans text-t-text/50 text-sm md:text-base text-center mb-8 tracking-wide">
                    Визы · Авторские туры · Образование за рубежом
                </p>

                {/* Social proof row */}
                <div className="flex items-center gap-4 mb-10 flex-wrap justify-center">
                    <a
                        href="https://2gis.ru/khabarovsk/firm/4926340373575901/tab/reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-t-text/60 hover:text-t-strong transition-colors text-xs font-mono"
                    >
                        <span className="text-t-strong">★★★★★</span>
                        <span>5.0 · 97 отзывов 2GIS</span>
                    </a>
                    <span className="w-px h-3 bg-t-text/20"></span>
                    <span className="text-t-text/40 text-xs font-mono">18 лет на рынке</span>
                    <span className="w-px h-3 bg-t-text/20"></span>
                    <a href="tel:+74212000000" className="text-t-text/60 hover:text-t-strong transition-colors text-xs font-mono">
                        Позвонить эксперту →
                    </a>
                </div>

                {/* Primary CTA */}
                <Magnetic strength={30}>
                    <button
                        onClick={() => setLayer(1)}
                        className="px-8 py-4 bg-t-strong hover:opacity-90 text-t-bg font-bold font-mono tracking-[0.2em] uppercase rounded flex items-center gap-3 transition-all mb-4"
                    >
                        Начать путешествие
                        <span className="material-symbols-outlined text-base">arrow_forward_ios</span>
                    </button>
                </Magnetic>

                {/* Scroll hint */}
                <div className="mt-6 flex flex-col items-center gap-2 opacity-40">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-t-strong">Прокрутите вниз</span>
                    <div className="flex flex-col gap-1">
                        <div className="w-px h-4 bg-t-strong/60 mx-auto animate-bounce"></div>
                    </div>
                </div>
            </div>

            {/* LAYER 1: Experience Finder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8" style={{ ...getLayerStyle(1), transition: 'all 800ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
                <ExperienceFinder images={IMAGES} onOpenModal={onOpenModal} />
            </div>

            {/* LAYER 2: Pricing (Core Offer) */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ ...getLayerStyle(2), transition: 'all 800ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
                <div className="w-full h-full md:h-auto overflow-y-auto hide-scrollbar pt-24 md:pt-0 pb-20 md:pb-0 relative z-10">
                    <PricingSection />
                </div>
            </div>

            {/* LAYER 3: Contact (Finale) */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ ...getLayerStyle(3), transition: 'all 800ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
                <div className="w-full h-full md:h-auto overflow-y-auto hide-scrollbar pt-24 md:pt-0 pb-20 md:pb-0 relative z-10">
                    <ContactSection />
                </div>
            </div>

            {/* Position Indicator (Replaces scrollbar) */}
            <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 mix-blend-difference">
                {[0, 1, 2, 3].map(i => (
                    <div
                        key={i}
                        onClick={() => setLayer(i)}
                        className={`w-1.5 h-12 rounded-full cursor-pointer transition-all duration-700 ${layer === i ? 'bg-t-strong' : 'bg-t-text/20 hover:bg-t-text/40'}`}
                    />
                ))}
            </div>

        </div>
    );
};

export default CodropsStickyGrid;
