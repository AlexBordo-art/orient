import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import GlobalBackground from '../components/GlobalBackground';
import LeadModal from '../components/LeadModal';

export const ModalContext = React.createContext({
    openLeadModal: () => { }
});

const RootLayout: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const location = useLocation();

    return (
        <ModalContext.Provider value={{ openLeadModal: () => setIsModalOpen(true) }}>
            <div
                className="flex flex-col min-h-screen overflow-x-hidden"
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            >
                <ScrollToTop />
                <GlobalBackground />

                {/* Persistent navigation on every page, home included (trunk test). */}
                <Navbar />

                <main key={location.pathname} className="page-transition flex-grow flex flex-col relative z-10">
                    <Outlet />
                </main>

                <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </ModalContext.Provider>
    );
};

export default RootLayout;
