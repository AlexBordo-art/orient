import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const HOME_IMAGES = [
    "/backgrounds/bg-sakura.webp",
    "/backgrounds/bg-bonsai.webp",
    "/backgrounds/bg-pion.webp",
    "/backgrounds/bg-vetka.webp",
];

const ROUTE_IMAGE: { prefix: string; src: string }[] = [
    { prefix: '/visas', src: '/backgrounds/bg-bambuk.webp' },
    { prefix: '/education', src: '/backgrounds/bg-book.webp' },
];

const GlobalBackground: React.FC = () => {
    const { isDay } = useTheme();
    const location = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    const routeMatch = ROUTE_IMAGE.find(r => location.pathname.startsWith(r.prefix));
    const IMAGES = routeMatch ? [routeMatch.src] : HOME_IMAGES;

    // Preload images, reset on route change
    useEffect(() => {
        setCurrentIndex(0);
        setPrevIndex(null);
        IMAGES.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => setLoadedImages(prev => prev.includes(src) ? prev : [...prev, src]);
        });
    }, [location.pathname]);

    // Auto-rotate only when multiple images available
    useEffect(() => {
        if (IMAGES.length < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                setPrevIndex(prev);
                return (prev + 1) % IMAGES.length;
            });
        }, 9000);
        return () => clearInterval(interval);
    }, [IMAGES.length]);

    // Clear prevIndex after transition completes
    useEffect(() => {
        if (prevIndex === null) return;
        const timer = setTimeout(() => setPrevIndex(null), 2500);
        return () => clearTimeout(timer);
    }, [prevIndex]);

    return (
        <div
            className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden transition-colors duration-700"
            style={{ backgroundColor: 'var(--color-bg)' }}
        >
            {/* Images with true cross-fade: prev stays visible while next fades in on top */}
            {IMAGES.map((src, index) => {
                const isCurrent = index === currentIndex;
                const isPrev = index === prevIndex;
                const isLoaded = loadedImages.includes(src);

                if (!isCurrent && !isPrev) return null;

                return (
                    <div
                        key={src}
                        className="absolute inset-0"
                        style={{
                            zIndex: isCurrent ? 11 : 10,
                            opacity: isCurrent && isLoaded ? 1 : isPrev ? 1 : 0,
                            transition: isCurrent ? 'opacity 2500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                        }}
                    >
                        <img
                            src={src}
                            alt=""
                            className={`w-full h-full object-cover object-center photo-atmosphere ${isCurrent ? 'animate-ken-burns' : ''}`}
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </div>
                );
            })}

            {/* Theme-aware overlays */}
            {isDay ? (
                <>
                    {/* Day: warm cream wash so photos feel sun-drenched */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBEB]/70 via-[#FFFBEB]/40 to-[#FFFBEB]/80 z-20 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-[#FEF3C7]/30 mix-blend-soft-light z-20" />
                </>
            ) : (
                <>
                    {/* Night: obsidian depth with subtle blue tint */}
                    <div className="absolute inset-0 bg-gradient-to-b from-obsidian-dark/60 via-obsidian/30 to-obsidian-dark/80 z-20 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-sapphire-dark/20 mix-blend-multiply z-20" />
                </>
            )}

            {/* Film grain */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none noise-bg z-20" />
        </div>
    );
};

export default GlobalBackground;
