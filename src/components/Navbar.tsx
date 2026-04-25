import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModalContext } from '../layouts/RootLayout';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const NAV_LINKS = [
    {
        label: 'Визы', href: '/visas', children: [
            { label: 'Китай', href: '/visas/china' },
            { label: 'Южная Корея', href: '/visas/korea' },
            { label: 'Таиланд', href: '/visas/thailand' },
            { label: 'Шенген', href: '/visas/schengen' },
            { label: 'Все визы →', href: '/visas' },
        ]
    },
    {
        label: 'Путешествия', href: '/tours', children: [
            { label: 'Туры в Китай', href: '/tours/china' },
            { label: 'По России', href: '/tours/russia' },
            { label: 'Горящие туры', href: '/tours/hot-deals' },
        ]
    },
    { label: 'Образование', href: '/education' },
    { label: 'Сервисы', href: '/services' },
];

export function Navbar() {
    const { openLeadModal } = useContext(ModalContext);
    const { theme, toggle: toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Body lock when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-pill ${
                scrolled
                    ? 'w-[90%] max-w-5xl glass-panel !rounded-pill py-3 px-6'
                    : 'w-full max-w-7xl bg-transparent border border-transparent py-5 px-8'
            }`}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
                    <div className="w-8 h-8 rounded-full bg-t-strong flex items-center justify-center text-t-bg font-bold font-mono text-xs overflow-hidden relative">
                        <span className="relative z-10">OE</span>
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight transition-colors duration-500 text-t-text">
                        Ориент Экспресс.
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map(link => {
                        const isActive = location.pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={`text-sm tracking-wide font-medium transition-colors duration-300 ${
                                    isActive ? 'text-t-strong' : 'text-t-muted hover:text-t-text'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Theme Toggle + CTA + Burger */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'night' ? 'Включить дневной режим' : 'Включить ночной режим'}
                        className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center
                            transition-all duration-500 bg-t-glass hover:border-t-strong
                            border border-t-glass-border text-t-muted hover:text-t-strong"
                    >
                        {theme === 'night'
                            ? <Sun size={16} strokeWidth={1.5} className="transition-transform duration-500 hover:rotate-90" />
                            : <Moon size={16} strokeWidth={1.5} className="transition-transform duration-500 hover:-rotate-12" />
                        }
                    </button>

                    <button
                        onClick={openLeadModal}
                        className="hidden md:flex btn-premium !py-2.5 !px-6 !text-[11px]"
                    >
                        Консультация
                    </button>

                    {/* Burger — min 44×44px hit target */}
                    <button
                        className="md:hidden flex flex-col gap-1.5
                            min-w-[44px] min-h-[44px] w-11 h-11
                            items-center justify-center z-50 relative"
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                        aria-expanded={menuOpen}
                    >
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 bg-t-text ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 bg-t-text ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 bg-t-text ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu — full-screen overlay */}
            <div
                className={`fixed inset-0 min-h-[100dvh] md:hidden flex flex-col pt-28 px-8
                    transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
                style={{
                    zIndex: -1,
                    background: 'var(--color-bg)',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
                }}
                aria-hidden={!menuOpen}
            >
                <div className="flex flex-col gap-6 overflow-y-auto pb-10">
                    {NAV_LINKS.map((link, i) => (
                        <div key={link.label}>
                            <Link
                                to={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-left text-3xl font-heading font-medium text-t-text border-b border-t-border pb-3 block min-h-[44px] flex items-center"
                                style={{
                                    opacity: menuOpen ? 1 : 0,
                                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `all 0.4s ease ${i * 0.1}s`,
                                }}
                            >
                                {link.label}
                            </Link>
                            {'children' in link && link.children && (
                                <div className="flex flex-wrap gap-2 mt-2 ml-2">
                                    {link.children.map(child => (
                                        <Link
                                            key={child.href}
                                            to={child.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="text-sm text-t-muted hover:text-t-strong
                                                px-3 py-2 min-h-[44px] flex items-center
                                                bg-t-glass rounded-full border border-t-glass-border"
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            openLeadModal();
                        }}
                        className="mt-4 btn-premium !rounded-pill !py-4 !text-base"
                        style={{
                            opacity: menuOpen ? 1 : 0,
                            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.4s ease 0.4s',
                        }}
                    >
                        Получить консультацию
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
