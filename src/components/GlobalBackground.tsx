import React, { useState, useEffect } from 'react';

const IMAGES = [
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2400", // Epic Landscape
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=2400", // Paris
    "https://images.unsplash.com/photo-1540541338287-41700607e5ce?auto=format&fit=crop&q=80&w=2400", // Resort
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2400"  // Metropolis
];

const GlobalBackground: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    // 1. Preload images so they don't pop in abruptly
    useEffect(() => {
        IMAGES.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => setLoadedImages(prev => [...prev, src]);
        });
    }, []);

    // 2. Start the rotation interval only when at least 2 images are loaded
    useEffect(() => {
        if (loadedImages.length < 2) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % IMAGES.length);
        }, 8000); // Change image every 8 seconds

        return () => clearInterval(interval);
    }, [loadedImages.length]);

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-obsidian-dark">
            {/* Images */}
            {IMAGES.map((src, index) => {
                const isActive = index === currentImageIndex;
                const isLoaded = loadedImages.includes(src);
                return (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive && isLoaded ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <img
                            src={src}
                            alt={`Background ${index}`}
                            className={`w-full h-full object-cover object-center ${isActive ? 'animate-ken-burns' : ''}`}
                            loading={index === 0 ? "eager" : "lazy"}
                            crossOrigin="anonymous"
                        />
                    </div>
                );
            })}

            {/* Premium Overlays - very light so the image shines through */}
            {/* Top to bottom gradient for text readability (Navbar & Footer) */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian-dark/60 via-obsidian/30 to-obsidian-dark/80 z-20" />

            {/* Deep blue color mix to give a consistent brand tint */}
            <div className="absolute inset-0 bg-sapphire-dark/20 mix-blend-multiply z-20" />

            {/* Subtle Film Grain overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none noise-bg z-20" />
        </div>
    );
};

export default GlobalBackground;
