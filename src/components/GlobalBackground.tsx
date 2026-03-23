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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    const routeMatch = ROUTE_IMAGE.find(r => location.pathname.startsWith(r.prefix));
    const IMAGES = routeMatch ? [routeMatch.src] : HOME_IMAGES;

    useEffect(() => {
        setCurrentImageIndex(0);
        IMAGES.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => setLoadedImages(prev => prev.includes(src) ? prev : [...prev, src]);
        });
    }, [location.pathname]);

    useEffect(() => {
        if (loadedImages.length < 2) return;
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % IMAGES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [loadedImages.length]);

    return (
        <div
            className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden transition-colors duration-700"
            style={{ backgroundColor: 'var(--color-bg)' }}
        >
            {/* Images — same photos, different filter per theme */}
            {IMAGES.map((src, index) => {
                const isActive = index === currentImageIndex;
                const isLoaded = loadedImages.includes(src);
                return (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive && isLoaded ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <img
                            src={src}
                            alt=""
                            className={`w-full h-full object-cover object-center photo-atmosphere ${isActive ? 'animate-ken-burns' : ''}`}
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
