import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import GlobalBackground from '../components/GlobalBackground';
import LeadModal from '../components/LeadModal';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ModalContext = React.createContext({
    openLeadModal: () => { }
});

const RootLayout: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const location = useLocation();
    const { theme, toggle } = useTheme();

    // The spatial portal must not allow native vertical scrolling.
    // It captures all vertical screen space and traps the user in its own Z-axis engine.
    const isHome = location.pathname === '/';

    // Forcefully kill any native body scrollbars when on the spatial portal
    React.useEffect(() => {
        if (isHome) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100dvh';
        } else {
            document.body.style.overflow = '';
            document.body.style.height = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [isHome]);

    return (
        <ModalContext.Provider value={{ openLeadModal: () => setIsModalOpen(true) }}>
            <div className={`flex flex-col ${isHome ? 'h-[100dvh] overflow-hidden' : 'min-h-screen overflow-x-hidden'}`} style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
                <GlobalBackground />

                {/* Hide the global Navbar on the Spatial Portal so it doesn't drag into the 3D layers */}
                {!isHome && <Navbar />}

                {/* Floating theme toggle — only on home (Spatial Portal has no Navbar) */}
                {isHome && (
                    <button
                        onClick={toggle}
                        aria-label={theme === 'night' ? 'Включить дневной режим' : 'Включить ночной режим'}
                        className={`fixed top-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                            theme === 'day'
                                ? 'bg-primary/8 hover:bg-primary/15 text-primary/70 hover:text-primary'
                                : 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-champagne'
                        }`}
                    >
                        {theme === 'night'
                            ? <Sun size={16} />
                            : <Moon size={16} />
                        }
                    </button>
                )}

                <main className="flex-grow flex flex-col relative z-10">
                    <Outlet />
                </main>

                {/* Completely hide the standard footer on the Spatial Portal so it cannot be scrolled to */}
                {!isHome && <SiteFooter />}

                <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </ModalContext.Provider>
    );
};

export default RootLayout;
