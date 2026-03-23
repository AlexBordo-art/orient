import React, { useContext } from 'react';
import CodropsStickyGrid from '../components/CodropsStickyGrid';
import SEO from '../components/SEO';
import { ModalContext } from '../layouts/RootLayout';

const Home: React.FC = () => {
    const { openLeadModal } = useContext(ModalContext);
    return (
        <main className="bg-transparent min-h-screen">
            <SEO
                title="Визы, Путешествия, Образование"
                description="Бюро путешествий Ориент Экспресс — оформление виз в Китай, Корею, Таиланд, Шенген. Авторские туры и образование за рубежом. С 2007 года, 5.0★ на 2GIS. Хабаровск и Москва."
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
            <CodropsStickyGrid onOpenModal={openLeadModal} />
        </main>
    );
};

export default Home;
