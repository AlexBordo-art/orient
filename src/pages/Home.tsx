import React from 'react';
import Hero from '../components/Hero';
import PortalCarousel from '../components/PortalCarousel';
// Note: We are transforming the site into a multi-page portal.
// Components like VisaForm, ServicesGrid, etc., will be moved to their respective sub-pages.

const Home: React.FC = () => {
    return (
        <main className="bg-obsidian min-h-screen">
            <Hero />
            <PortalCarousel />
        </main>
    );
};

export default Home;
