import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import GlobalBackground from '../components/GlobalBackground';
import LeadModal from '../components/LeadModal';

export const ModalContext = React.createContext({
    openLeadModal: () => { }
});

const RootLayout: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <ModalContext.Provider value={{ openLeadModal: () => setIsModalOpen(true) }}>
            <div className="min-h-screen flex flex-col bg-transparent text-foreground overflow-x-hidden">
                <GlobalBackground />
                <Navbar />
                <main className="flex-grow flex flex-col relative z-10">
                    <Outlet />
                </main>
                <SiteFooter />
                <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </ModalContext.Provider>
    );
};

export default RootLayout;
