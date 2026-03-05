import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
    "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80&w=2400", // Moody Dark Forest (Nura ref)
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=2400", // Misty Asian Mountains
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2400", // Organic Texture
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=2400"  // Minimalist Kyoto Temple
];

const GlobalBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Setup timeline driven by scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5, // 1.5 second smoothing
                }
            });

            // Initialize all images to opacity 0 except the first one
            gsap.set(imagesRef.current, { opacity: 0, scale: 1.05 });
            gsap.set(imagesRef.current[0], { opacity: 1 });

            // Animate scale continuously throughout the whole page scroll
            tl.to(imagesRef.current, {
                scale: 1.2, // Subtle Ken Burns as you scroll down
                ease: 'none',
                stagger: 0
            }, 0);

            // Calculate evenly spaced transition points
            const numImages = IMAGES.length;
            const segment = 1 / numImages;

            IMAGES.forEach((_, i) => {
                if (i === 0) return; // Skip first image as it's already visible

                const startFadeIn = (i * segment) - (segment * 0.2); // Start fading in slightly before segment starts

                // Fade in the next image
                tl.to(imagesRef.current[i], {
                    opacity: 1,
                    ease: "power2.inOut",
                    duration: segment * 0.4
                }, startFadeIn);
            });

        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden" ref={containerRef}>
            {/* Image Slider */}
            {IMAGES.map((src, index) => (
                <img
                    key={index}
                    ref={(el) => { imagesRef.current[index] = el; }}
                    src={src}
                    alt={`Travel Background ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ willChange: 'transform, opacity' }}
                />
            ))}

            {/* Overlays for contrast: Moss-to-Black heavy gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-primary/80 to-charcoal" />
            <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-charcoal/40" />
        </div>
    );
};

export default GlobalBackground;
