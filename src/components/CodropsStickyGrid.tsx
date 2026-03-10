import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400", // Tokyo
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400", // Paris
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&q=80&w=400", // Japan
    "https://images.unsplash.com/photo-1510809228800-4b21a8cd36b6?auto=format&fit=crop&q=80&w=400", // Seoul
    "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&q=80&w=400", // Nature
    "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80&w=400", // Dubai
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400", // Rome
    "https://images.unsplash.com/photo-1584347525865-1d48c8b4081c?auto=format&fit=crop&q=80&w=400", // Beach
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=400", // Swiss
    "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=400", // London
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=400", // Boat
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400", // NYC
];

interface CodropsStickyGridProps {
    onOpenModal: () => void;
}

const CodropsStickyGrid: React.FC<CodropsStickyGridProps> = ({ onOpenModal }) => {
    const mainBlockRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Content Refs
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subTitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);

    // Grid Refs
    const gridRef = useRef<HTMLUListElement>(null);
    const gridItemsRef = useRef<(HTMLLIElement | null)[]>([]);

    useGSAP(() => {
        const block = mainBlockRef.current;
        const wrapper = wrapperRef.current;
        const content = contentRef.current;
        const title = titleRef.current;
        const description = subTitleRef.current;
        const button = ctaRef.current;
        const grid = gridRef.current;

        if (!block || !wrapper || !content || !title || !grid || !description || !button) return;

        // Group into 3 columns
        const columns: HTMLElement[][] = [[], [], []];
        gridItemsRef.current.forEach((el, index) => {
            if (el) columns[index % 3].push(el);
        });

        // INIT CONTENT
        gsap.set([description, button], { opacity: 0, pointerEvents: "none" });

        // Wait a tiny bit for render to settle before calculating offset so fonts have applied constraints
        setTimeout(() => {
            // Calculate how many pixels are needed to vertically center the title inside its container
            const dy = (content.offsetHeight - title.offsetHeight) / 2;
            const titleOffsetY = (dy / content.offsetHeight) * 100;
            gsap.set(title, { yPercent: titleOffsetY });

            // ADD PARALLAX ON SCROLL (Wrapper)
            gsap.from(wrapper, {
                yPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: block,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            });

            // ANIMATE TITLE ON SCROLL (Title Opacity)
            gsap.from(title, {
                opacity: 0,
                duration: 0.7,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: block,
                    start: "top 57%",
                    toggleActions: "play none none reset",
                },
            });

            // MAIN GRID ANIMATION TIMELINE
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: block,
                    start: "top 25%",
                    end: "bottom bottom",
                    scrub: true,
                },
            });

            // Grid Reveal (y: from outside viewport)
            const wh = window.innerHeight;
            const distY = wh - (wh - grid.offsetHeight) / 2;

            const revealTl = gsap.timeline();
            columns.forEach((column, colIndex) => {
                const fromTop = colIndex % 2 === 0;
                revealTl.from(column, {
                    y: distY * (fromTop ? -1 : 1),
                    stagger: {
                        each: 0.06,
                        from: fromTop ? "end" : "start",
                    },
                    ease: "power1.inOut",
                }, "grid-reveal");
            });
            tl.add(revealTl);

            // Grid Zoom
            const zoomTl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
            zoomTl.to(grid, { scale: 2.05 });
            zoomTl.to(columns[0], { xPercent: -40 }, "<");
            zoomTl.to(columns[2], { xPercent: 40 }, "<");
            // Central split
            zoomTl.to(columns[1], {
                yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
                duration: 0.5,
                ease: "power1.inOut"
            }, "-=0.5");
            tl.add(zoomTl, "-=0.6");

            // Toggle Text
            const toggleContent = (isVisible: boolean) => {
                gsap.timeline({ defaults: { overwrite: true } })
                    .to(title, {
                        yPercent: isVisible ? 0 : titleOffsetY,
                        duration: 0.7,
                        ease: "power2.inOut",
                    })
                    .to([description, button], {
                        opacity: isVisible ? 1 : 0,
                        duration: 0.4,
                        ease: `power1.${isVisible ? "inOut" : "out"}`,
                        pointerEvents: isVisible ? "all" : "none",
                    }, isVisible ? "-=90%" : "<");
            };

            tl.add(() => toggleContent(tl.scrollTrigger!.direction === 1), "-=0.32");
        }, 100); // 100ms timeout to ensure DOM paints its layout dimensions completely

    }, { scope: mainBlockRef });

    return (
        <div className="bg-[#f4f4f4] text-[#050505] font-sans selection:bg-obsidian-dark selection:text-white">

            {/* Intro Block (Scrolls up to reveal the sticky block under it) */}
            <section className="relative z-10 block block--intro bg-[#f4f4f4]">
                <figure className="relative flex justify-center items-center w-full h-screen px-6 m-0 opacity-90 mix-blend-multiply">
                    <img
                        className="absolute top-0 left-0 w-full h-full object-cover bg-gray-200"
                        src="https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80&w=1920"
                        alt="Intro"
                    />
                    <figcaption className="relative w-[221px] text-[14px] font-mono uppercase text-center text-obsidian tracking-wider">
                        Путешествие начинается здесь
                    </figcaption>
                </figure>
            </section>

            {/* Main Sticky Block */}
            <section ref={mainBlockRef} className="block block--main h-[425vh] bg-[#f4f4f4]">
                <div ref={wrapperRef} className="sticky top-0 px-6 h-screen overflow-hidden will-change-transform bg-[#f4f4f4]">

                    {/* Centered Content */}
                    <div ref={contentRef} className="content relative flex flex-col justify-center items-center w-full h-screen text-center z-10 pointer-events-none">
                        <h2
                            ref={titleRef}
                            className="font-heading max-w-full md:w-[924px] text-6xl md:text-[104px] leading-[1.15] tracking-[-0.02em] font-normal pointer-events-none text-obsidian"
                        >
                            Ориент Экспресс
                        </h2>

                        <p
                            ref={subTitleRef}
                            className="mt-6 md:w-[455px] text-[14px] leading-[1.3] uppercase tracking-wide font-sans text-obsidian-light pointer-events-none"
                        >
                            Структурированная система визового сопровождения. Мы открываем границы плавно, безопасно и эффективно.
                        </p>

                        <button
                            ref={ctaRef}
                            onClick={onOpenModal}
                            className="mt-8 text-[14px] uppercase tracking-widest font-bold hover:underline underline-offset-4 pointer-events-auto transition-transform active:scale-95"
                        >
                            Начать путь →
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="gallery absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[736px] pointer-events-none z-0">
                        <ul ref={gridRef} className="gallery__grid grid grid-cols-3 gap-x-8 gap-y-10 will-change-transform list-none p-0 m-0">
                            {IMAGES.map((src, idx) => (
                                <li
                                    key={idx}
                                    ref={(el) => { if (el) gridItemsRef.current[idx] = el; }}
                                    className="gallery__item w-full aspect-square will-change-transform bg-gray-200"
                                >
                                    <img src={src} alt="Travel" className="w-full h-full object-cover" />
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default CodropsStickyGrid;
