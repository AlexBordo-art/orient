import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModalContext } from '../layouts/RootLayout';

const NAV_LINKS = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Visas', href: '#visas' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Protocols', href: '#process' },
];

export function Navbar() {
    const { openLeadModal } = useContext(ModalContext);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleAnchor = (href: string) => {
        setMenuOpen(false);
        if (href.startsWith('#') && isHome) {
            const el = document.querySelector(href);
            el?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-pill ${scrolled
                ? 'w-[90%] max-w-5xl bg-white/60 backdrop-blur-xl border border-primary/10 shadow-2xl py-3 px-6'
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
                    <span
                        className={`font-heading font-bold text-lg tracking-tight transition-colors duration-500 line-height-[1] ${scrolled ? 'text-charcoal' : 'text-white'}`}
                    >
                        Orient Express.
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(link => (
                        link.href.startsWith('#') ? (
                            <button
                                key={link.label}
                                onClick={() => handleAnchor(link.href)}
                                className={`text-sm tracking-wide font-medium transition-colors duration-300 relative group overflow-hidden ${scrolled ? 'text-charcoal/70 hover:text-primary' : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                <span className="relative z-10">{link.label}</span>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </button>
                        ) : (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={`text-sm tracking-wide font-medium transition-colors duration-300 relative group overflow-hidden ${scrolled ? 'text-charcoal/70 hover:text-primary' : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                <span className="relative z-10">{link.label}</span>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </Link>
                        )
                    ))}
                </div>

                {/* CTA + Burger */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={openLeadModal}
                        className={`hidden md:flex items-center justify-center px-6 py-2.5 rounded-pill text-sm font-semibold transition-all duration-300 overflow-hidden relative group ${scrolled ? 'bg-primary text-cream hover:scale-105' : 'bg-white text-primary hover:scale-105'
                            }`}
                    >
                        <span className="relative z-10">Initialize Journey</span>
                        <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out ${scrolled ? 'bg-accent' : 'bg-accent'}`} />
                    </button>

                    {/* Burger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center z-50 relative"
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Menu"
                    >
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 min-h-screen bg-cream rounded-none md:hidden flex flex-col pt-32 px-8 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${menuOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
                style={{ zIndex: -1 }}
            >
                <div className="flex flex-col gap-8">
                    {NAV_LINKS.map((link, i) => (
                        <button
                            key={link.label}
                            onClick={() => handleAnchor(link.href)}
                            className="text-left text-4xl font-heading font-medium text-primary border-b border-primary/10 pb-4"
                            style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.4s ease ${i * 0.1}s` }}
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            openLeadModal();
                        }}
                        className="mt-8 bg-accent text-white rounded-pill py-4 text-center font-semibold text-lg"
                        style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.4s ease 0.4s` }}
                    >
                        Initialize Journey
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
