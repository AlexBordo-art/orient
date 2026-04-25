import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticProps {
    children: React.ReactElement<any>;
    className?: string;
    strength?: number;
}

const Magnetic: React.FC<MagneticProps> = ({ children, className = '', strength = 30 }) => {
    const magneticRef = useRef<HTMLDivElement>(null);

    // On touch-primary devices (phones, tablets) the magnetic effect is
    // meaningless (no mouse cursor) and wastes event-listener budget.
    // Return a plain wrapper with no GSAP listeners.
    const isTouch =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: coarse)').matches;

    useEffect(() => {
        if (isTouch) return; // ← skip entirely on touch devices

        const xTo = gsap.quickTo(magneticRef.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        const yTo = gsap.quickTo(magneticRef.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        const handleMouseMove = (e: MouseEvent) => {
            if (!magneticRef.current) return;
            const { clientX, clientY } = e;
            const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * (strength / 100));
            yTo(y * (strength / 100));
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        const currentRef = magneticRef.current;
        if (currentRef) {
            currentRef.addEventListener('mousemove', handleMouseMove);
            currentRef.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('mousemove', handleMouseMove);
                currentRef.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [strength, isTouch]);

    return React.cloneElement(children, {
        ref: magneticRef,
        className: `${children.props.className || ''} ${className}`.trim(),
    });
};

export default Magnetic;
