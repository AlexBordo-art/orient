import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModalContext } from '../layouts/RootLayout';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown, Sun, Moon } from 'lucide-react';

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
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setOpenDropdown(null);
        setMenuOpen(false);
    }, [location.pathname]);

    const isDayTheme = theme === 'day';
    const textColor = (scrolled || isDayTheme) ? 'text-charcoal/70 hover:text-primary' : 'text-white/80 hover:text-white';
    const activeColor = (scrolled || isDayTheme) ? 'text-primary' : 'text-champagne';

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-pill ${
                scrolled
                ? 'w-[90%] max-w-5xl bg-white/60 backdrop-blur-xl border border-primary/10 shadow-2xl py-3 px-6'
                : isDayTheme
                    ? 'w-full max-w-7xl bg-white/40 backdrop-blur-md border border-primary/5 py-5 px-8'
                    : 'w-full max-w-7xl bg-transparent border-transparent py-5 px-8'
                }`}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold font-data text-xs overflow-hidden relative">
                        <span className="relative z-10">OE</span>
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </div>
                    <span className={`font-heading font-bold text-lg tracking-tight transition-colors duration-500 ${(scrolled || isDayTheme) ? 'text-charcoal' : 'text-white'}`}>
                        Ориент Экспресс.
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map(link => {
                        const isActive = location.pathname.startsWith(link.href);
                        const hasChildren = 'children' in link && link.children;

                        return (
                            <div
                                key={link.label}
                                className="relative"
                                onMouseEnter={() => hasChildren && setOpenDropdown(link.label)}
                                onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                            >
                                <Link
                                    to={link.href}
                                    className={`text-sm tracking-wide font-medium transition-colors duration-300 flex items-center gap-1 ${isActive ? activeColor : textColor}`}
                                >
                                    <span>{link.label}</span>
                                    {hasChildren && <ChevronDown size={14} className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />}
                                </Link>

                                {/* Dropdown — pt-3 creates hover bridge, no gap to lose mouse */}
                                {hasChildren && openDropdown === link.label && (
                                    <div className="absolute top-full left-0 pt-3 z-50">
                                        <div className="py-2 min-w-[220px] bg-obsidian/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
                                            {link.children!.map(child => (
                                                <Link
                                                    key={child.href}
                                                    to={child.href}
                                                    className="block px-5 py-3 text-sm text-slate-200 hover:text-champagne hover:bg-white/5 transition-colors"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Theme Toggle + CTA + Burger */}
                <div className="flex items-center gap-3">
                    {/* Day / Night Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'night' ? 'Включить дневной режим' : 'Включить ночной режим'}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                            scrolled || isDayTheme
                                ? 'bg-primary/5 hover:bg-primary/10 text-primary/60 hover:text-primary'
                                : 'bg-white/5 hover:bg-white/15 text-white/60 hover:text-champagne'
                        }`}
                    >
                        {theme === 'night'
                            ? <Sun size={16} className="transition-transform duration-500 hover:rotate-90" />
                            : <Moon size={16} className="transition-transform duration-500 hover:-rotate-12" />
                        }
                    </button>

                    <button
                        onClick={openLeadModal}
                        className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-pill text-sm font-semibold transition-all duration-300 overflow-hidden relative group bg-gradient-to-r from-champagne-light to-champagne text-obsidian-dark hover:scale-105 shadow-lg shadow-champagne/20"
                    >
                        <span className="relative z-10">Консультация</span>
                        <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-champagne-dark" />
                    </button>

                    {/* Burger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center z-50 relative"
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Menu"
                    >
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled || menuOpen || isDayTheme ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled || menuOpen || isDayTheme ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled || menuOpen || isDayTheme ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 min-h-screen bg-cream rounded-none md:hidden flex flex-col pt-32 px-8 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
                style={{ zIndex: -1 }}
            >
                <div className="flex flex-col gap-6">
                    {NAV_LINKS.map((link, i) => (
                        <div key={link.label}>
                            <Link
                                to={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-left text-3xl font-heading font-medium text-primary border-b border-primary/10 pb-3 block"
                                style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.4s ease ${i * 0.1}s` }}
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
                                            className="text-sm text-primary/60 hover:text-primary px-3 py-1.5 bg-primary/5 rounded-full"
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
                        className="mt-6 bg-accent text-white rounded-pill py-4 text-center font-semibold text-lg"
                        style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.4s ease 0.4s` }}
                    >
                        Получить консультацию
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
