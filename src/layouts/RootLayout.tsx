import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
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

    const isHome = location.pathname === '/';

    // Body scroll lock:
    // - Desktop home: lock (spatial portal owns the viewport)
    // - Mobile home: allow scroll (CodropsStickyGrid renders static flow on mobile)
    // - All other pages: allow scroll
    React.useEffect(() => {
        const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
        if (isHome && !isMobileViewport) {
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
            <div
                className={`flex flex-col ${
                    isHome
                        // Desktop: locked viewport for spatial portal.
                        // Mobile: normal scroll (md:overflow-hidden only applies ≥768px).
                        ? 'md:h-[100dvh] md:overflow-hidden'
                        : 'min-h-screen overflow-x-hidden'
                }`}
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            >
                <GlobalBackground />

                {/* On desktop home the spatial portal has no Navbar — it owns the whole screen.
                    On mobile home we show the Navbar so users can navigate away. */}
                {(!isHome || window.matchMedia('(max-width: 767px)').matches) && <Navbar />}

                {/* Floating theme toggle — only on desktop home */}
                {isHome && (
                    <button
                        onClick={toggle}
                        aria-label={theme === 'night' ? 'Включить дневной режим' : 'Включить ночной режим'}
                        className={`fixed top-6 right-6 z-50 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full
                            flex items-center justify-center transition-all duration-500
                            md:flex hidden
                            ${theme === 'day'
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

                <main key={location.pathname} className="page-transition flex-grow flex flex-col relative z-10">
                    <Outlet />
                </main>

                <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </ModalContext.Provider>
    );
};

export default RootLayout;
