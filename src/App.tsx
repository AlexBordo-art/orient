import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import VisaHub from './pages/VisaHub';
import VisaPage from './pages/VisaPage';
import ToursHub from './pages/ToursHub';
import ToursCategory from './pages/ToursCategory';
import TourPage from './pages/TourPage';
import EducationHub from './pages/EducationHub';
import EducationProgram from './pages/EducationProgram';
import ServicesHub from './pages/ServicesHub';
import ServicePage from './pages/ServicePage';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        {/* Силос 1: Визы */}
        <Route path="visas" element={<VisaHub />} />
        <Route path="visas/:country" element={<VisaPage />} />

        {/* Силос 2: Путешествия */}
        <Route path="tours" element={<ToursHub />} />
        <Route path="tours/:destination" element={<ToursCategory />} />
        <Route path="tours/:destination/:tourId" element={<TourPage />} />

        {/* Силос 3: Образование */}
        <Route path="education" element={<EducationHub />} />
        <Route path="education/:program" element={<EducationProgram />} />

        {/* Силос 4: Сервисы */}
        <Route path="services" element={<ServicesHub />} />
        <Route path="services/:service" element={<ServicePage />} />

        {/* Утилиты и контент (Заглушки) */}
        <Route path="blog" element={<ComingSoon />} />
        <Route path="reviews" element={<ComingSoon />} />
        <Route path="about" element={<ComingSoon />} />
        <Route path="contact" element={<ComingSoon />} />
        <Route path="privacy" element={<ComingSoon />} />

        {/* 404 Fallback */}
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}

export default App;
