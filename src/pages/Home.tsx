import React from 'react';
import Hero from '../components/Hero';
import PortalCarousel from '../components/PortalCarousel';
import SEO from '../components/SEO';

const Home: React.FC = () => {
    return (
        <main className="bg-obsidian min-h-screen">
            <SEO
                title="Визы, Путешествия, Образование"
                description="Бюро путешествий Ориент Экспресс — оформление виз в Китай, Корею, Таиланд, Шенген. Авторские туры и образование за рубежом. 12+ лет опыта, 99.8% одобрений. Хабаровск и Москва."
                canonical="/"
                keywords="оформление виз Хабаровск, визы в Китай, туры в Китай, образование за рубежом, Ориент Экспресс"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Ориент Экспресс",
                    "url": "https://orient-dv.ru",
                    "description": "Бюро путешествий и визовой поддержки",
                    "foundingDate": "2007",
                    "address": [
                        { "@type": "PostalAddress", "addressLocality": "Хабаровск", "addressCountry": "RU" },
                        { "@type": "PostalAddress", "addressLocality": "Москва", "addressCountry": "RU" }
                    ]
                }}
            />
            <Hero />
            <PortalCarousel />
        </main>
    );
};

export default Home;
