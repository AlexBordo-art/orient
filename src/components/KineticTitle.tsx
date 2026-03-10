import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTitleProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

const KineticTitle: React.FC<KineticTitleProps> = ({
    text,
    className = "",
    delay = 0,
    stagger = 0.05,
    tag: Tag = 'h2'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Split text into words to animate them individually
    const words = text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden relative mr-[-0.1em] align-top pr-[0.3em]">
            <span className="kinetic-word inline-block translate-y-[120%] opacity-0 rotate-6 transform-gpu will-change-transform pb-2">
                {word}
            </span>
        </span>
    ));

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.to('.kinetic-word', {
                y: '0%',
                opacity: 1,
                rotation: 0,
                duration: 1.2,
                ease: 'expo.out',
                stagger: stagger,
                delay: delay,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, { scope: containerRef, dependencies: [text, delay, stagger] });

    return (
        <div ref={containerRef} className="relative">
            <Tag className={`${className} flex flex-wrap gap-x-0`}>
                {words}
            </Tag>
        </div>
    );
};

export default KineticTitle;
