import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticProps {
    children: React.ReactElement<any>;
    className?: string;
    strength?: number;
}

const Magnetic: React.FC<MagneticProps> = ({ children, className = '', strength = 30 }) => {
    const magneticRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const xTo = gsap.quickTo(magneticRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magneticRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            if (!magneticRef.current) return;
            const { clientX, clientY } = e;
            const { height, width, left, top } = magneticRef.current.getBoundingClientRect();

            // Calculate distance from center
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Apply movement based on strength
            xTo(x * (strength / 100));
            yTo(y * (strength / 100));
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        const currentRef = magneticRef.current;
        if (currentRef) {
            currentRef.addEventListener("mousemove", handleMouseMove);
            currentRef.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("mousemove", handleMouseMove);
                currentRef.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [strength]);

    // Clone the child element to attach the ref and preserve its existing classes/props
    return React.cloneElement(children, {
        ref: magneticRef,
        className: `${children.props.className || ''} ${className}`.trim()
    });
};

export default Magnetic;
