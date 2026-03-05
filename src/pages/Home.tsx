import React from 'react';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import VisaForm from '../components/VisaForm';
import PopularDestinations from '../components/PopularDestinations';

const Home: React.FC = () => {
    return (
        <main className="bg-transparent">
            <Hero />
            <ServicesGrid />
            <VisaForm />
            <PopularDestinations />
        </main>
    );
};

export default Home;
