import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const NAV_LINKS = [
    {
        index: '01',
        label: 'Визы',
        href: '/visas',
        children: [
            { label: 'Китай', href: '/visas/china' },
            { label: 'Южная Корея', href: '/visas/korea' },
            { label: 'Таиланд', href: '/visas/thailand' },
            { label: 'Шенген', href: '/visas/schengen' },
            { label: 'Все направления', href: '/visas' },
        ],
    },
    {
        index: '02',
        label: 'Путешествия',
        href: '/tours',
        children: [
            { label: 'Туры в Китай', href: '/tours/china' },
            { label: 'По России', href: '/tours/russia' },
            { label: 'Горящие туры', href: '/tours/hot-deals' },
            { label: 'Достопримечательности', href: '/sights' },
        ],
    },
    { index: '03', label: 'Образование', href: '/education' },
    { index: '04', label: 'Сервисы', href: '/services' },
    { index: '05', label: 'Блог', href: '/blog' },
];

// Detect reduced-motion preference (stable, read once)
const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Navbar() {
    const { theme, toggle: toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Scroll detector for subtle backdrop
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Body lock when menu open (iOS-correct pattern)
    useEffect(() => {
        if (menuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overscrollBehavior = 'none';
        } else {
            const scrollY = parseInt(document.body.style.top || '0') * -1;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overscrollBehavior = '';
            if (scrollY) window.scrollTo(0, scrollY);
        }
        return () => {
            const scrollY = parseInt(document.body.style.top || '0') * -1;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overscrollBehavior = '';
            if (scrollY) window.scrollTo(0, scrollY);
        };
    }, [menuOpen]);

    // Close on Esc
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    }, [menuOpen]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Transition config — instant when prefers-reduced-motion
    const DURATION = prefersReduced ? '0ms' : '320ms';
    const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const STAGGER_BASE = prefersReduced ? 0 : 60;

    return (
        <>
            {/* ── Bar ─────────────────────────────────────────────────────── */}
            <nav
                aria-label="Навигация"
                className={`fixed top-0 left-0 right-0 z-[70] h-16 md:h-20 transition-all
                    ${scrolled ? 'bg-[var(--color-bg)]/95' : 'bg-transparent'}`}
                style={{ transitionDuration: DURATION, transitionTimingFunction: EASE }}
            >
              <div className="max-w-7xl mx-auto h-full px-6 md:px-10 flex items-center justify-between">
                {/* Wordmark — typographic masthead, gold only as a glint */}
                <Link
                    to="/"
                    className="group"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Ориент Экспресс — на главную"
                >
                    <span
                        className="font-heading tracking-tight text-[var(--color-text)]
                            text-lg md:text-xl
                            transition-opacity duration-300 group-hover:opacity-60"
                    >
                        Ориент Экспресс<span className="text-[var(--color-accent-strong)]">.</span>
                    </span>
                </Link>

                {/* Right: theme toggle + burger trigger */}
                <div className="flex items-center gap-5">
                    {/* Theme toggle — no background, just icon */}
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'night' ? 'Включить дневной режим' : 'Включить ночной режим'}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center
                            text-[var(--color-text-subtle)] hover:text-[var(--color-text)]
                            transition-colors duration-300"
                        style={{ transitionDuration: DURATION }}
                    >
                        {theme === 'night'
                            ? <Sun size={14} strokeWidth={1.5} />
                            : <Moon size={14} strokeWidth={1.5} />
                        }
                    </button>

                    {/* Burger / Close trigger */}
                    <button
                        onClick={() => setMenuOpen(v => !v)}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center gap-2.5
                            text-[var(--color-text-subtle)] hover:text-[var(--color-text)]
                            transition-colors duration-300 relative"
                        style={{ transitionDuration: DURATION }}
                    >
                        {/* Icon — thin lines or cross */}
                        <span className="relative flex flex-col gap-[5px] w-[18px]" aria-hidden="true">
                            <span
                                className="block h-px rounded-full bg-current transition-all"
                                style={{
                                    transitionDuration: DURATION,
                                    transitionTimingFunction: EASE,
                                    transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                                    width: menuOpen ? '18px' : '18px',
                                }}
                            />
                            <span
                                className="block h-px rounded-full bg-current transition-all"
                                style={{
                                    transitionDuration: DURATION,
                                    transitionTimingFunction: EASE,
                                    opacity: menuOpen ? 0 : 1,
                                    width: '13px',
                                }}
                            />
                            <span
                                className="block h-px rounded-full bg-current transition-all"
                                style={{
                                    transitionDuration: DURATION,
                                    transitionTimingFunction: EASE,
                                    transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                                    width: menuOpen ? '18px' : '10px',
                                }}
                            />
                        </span>

                        {/* Label */}
                        <span
                            className="font-mono text-[10px] md:text-[11px] uppercase
                                tracking-[0.18em] leading-none select-none"
                            style={{
                                transitionDuration: DURATION,
                                transitionTimingFunction: EASE,
                            }}
                        >
                            {menuOpen ? 'Закрыть' : 'Меню'}
                        </span>
                    </button>
                </div>
              </div>
            </nav>

            {/* ── Overlay ─────────────────────────────────────────────────── */}
            {/* Backdrop — click to close */}
            <div
                aria-hidden="true"
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-[60]"
                style={{
                    background: 'var(--color-bg)',
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? 'auto' : 'none',
                    transition: `opacity ${DURATION} ${EASE}`,
                }}
            />

            {/* Menu panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Навигационное меню"
                className="fixed inset-0 z-[61] flex flex-col
                    px-8 md:px-14 lg:px-20
                    pt-[72px] md:pt-20
                    pb-10 overflow-y-auto"
                style={{
                    pointerEvents: menuOpen ? 'auto' : 'none',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
                    transition: prefersReduced
                        ? 'none'
                        : `opacity 280ms ${EASE}, transform 320ms ${EASE}`,
                }}
            >
                {/* Nav items */}
                <nav className="flex flex-col mt-6 md:mt-10">
                    {NAV_LINKS.map((link, i) => {
                        const isActive = location.pathname.startsWith(link.href);
                        return (
                            <div
                                key={link.label}
                                className="border-t border-[var(--color-border)]"
                                style={{
                                    opacity: menuOpen ? 1 : 0,
                                    transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                                    transition: prefersReduced
                                        ? 'none'
                                        : `opacity 360ms ${EASE} ${i * STAGGER_BASE}ms,
                                           transform 400ms ${EASE} ${i * STAGGER_BASE}ms`,
                                }}
                            >
                                <div className="py-5 md:py-6 flex items-start justify-between gap-6 group">
                                    <div className="flex items-baseline gap-5 md:gap-8">
                                        {/* Index label */}
                                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase
                                            text-[var(--color-text-subtle)] flex-shrink-0 mt-1.5">
                                            {link.index}
                                        </span>

                                        {/* Primary link */}
                                        <Link
                                            to={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`font-heading font-medium leading-[1.05]
                                                transition-colors duration-200
                                                text-[clamp(2.2rem,6vw,4.5rem)]
                                                ${isActive
                                                    ? 'text-[var(--color-text)]'
                                                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </div>
                                </div>

                                {/* Sub-links */}
                                {'children' in link && link.children && (
                                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 pb-5 pl-10 md:pl-16">
                                        {link.children.map(child => (
                                            <Link
                                                key={child.href}
                                                to={child.href}
                                                onClick={() => setMenuOpen(false)}
                                                className="font-mono text-[11px] tracking-[0.15em] uppercase
                                                    text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)]
                                                    transition-colors duration-200 py-1"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Last border */}
                    <div className="border-t border-[var(--color-border)]" />
                </nav>

                {/* Footer of menu — contact line */}
                <div
                    className="mt-auto pt-8 flex items-center gap-6 flex-wrap"
                    style={{
                        opacity: menuOpen ? 1 : 0,
                        transition: prefersReduced
                            ? 'none'
                            : `opacity 400ms ${EASE} ${NAV_LINKS.length * STAGGER_BASE + 80}ms`,
                    }}
                >
                    <a
                        href="tel:+74212000000"
                        className="font-mono text-[11px] tracking-[0.2em] uppercase
                            text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)]
                            transition-colors duration-200"
                    >
                        Позвонить
                    </a>
                    <span className="w-px h-3 bg-[var(--color-border)]" aria-hidden="true" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-subtle)]">
                        С 2007 года · Хабаровск · Москва
                    </span>
                </div>
            </div>
        </>
    );
}

export default Navbar;
