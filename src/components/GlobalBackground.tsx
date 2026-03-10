import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const IMAGES = [
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2400", // Nature / Epic Landscape
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=2400", // European Architecture / Paris
    "https://images.unsplash.com/photo-1540541338287-41700607e5ce?auto=format&fit=crop&q=80&w=2400", // Luxury Resort
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2400"  // Modern Metropolis
];

const GlobalBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const images = gsap.utils.toArray('.bg-image') as HTMLElement[];
            if (images.length === 0) return;

            gsap.set(images, { opacity: 0, scale: 1 });
            gsap.set(images[0], { opacity: 1 });

            const startAnimation = (index: number) => {
                const currentImg = images[index];
                const nextIndex = (index + 1) % images.length;
                const nextImg = images[nextIndex];

                // Ensure correct stacking order
                gsap.set(currentImg, { zIndex: 1 });
                gsap.set(nextImg, { zIndex: 2 });

                // Ken Burns: slow zoom on current image
                gsap.to(currentImg, {
                    scale: 1.10,
                    duration: 8,
                    ease: 'none',
                });

                // Crossfade: fade in next image after a delay
                gsap.to(nextImg, {
                    opacity: 1,
                    duration: 2.5,
                    ease: 'power2.inOut',
                    delay: 5.5,
                    onStart: () => {
                        // Start zooming next image as soon as it begins to appear
                        gsap.set(nextImg, { scale: 1 });
                        gsap.to(nextImg, {
                            scale: 1.10,
                            duration: 8,
                            ease: 'none',
                        });
                    },
                    onComplete: () => {
                        gsap.set(currentImg, { opacity: 0 }); // Hide old image completely
                        startAnimation(nextIndex); // Queue next cycle
                    }
                });
            };

            startAnimation(0);

        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden" ref={containerRef}>
            {/* Image Slider */}
            {IMAGES.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Cinematic Background ${index + 1}`}
                    className="bg-image absolute inset-0 w-full h-full object-cover object-center"
                    style={{ willChange: 'transform, opacity' }}
                />
            ))}

            {/* Overlays for contrast: Obsidian-to-Sapphire luxury gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian-dark/40 via-obsidian/70 to-obsidian-dark z-10" />
            <div className="absolute inset-0 bg-sapphire-dark/30 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-obsidian-dark/60 z-10" />

            {/* Subtle noise layer to blend images and gradients */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none noise-bg z-10" />
        </div>
    );
};

export default GlobalBackground;
