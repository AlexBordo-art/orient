import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import VisaHub from './pages/VisaHub';
import VisaPage from './pages/VisaPage';
import ToursHub from './pages/ToursHub';
import EducationHub from './pages/EducationHub';
import ServicesHub from './pages/ServicesHub';

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

        {/* Силос 3: Образование */}
        <Route path="education" element={<EducationHub />} />

        {/* Силос 4: Сервисы */}
        <Route path="services" element={<ServicesHub />} />

        {/* TODO Phase 4+: Blog, Reviews, About, Contact, Privacy */}
      </Route>
    </Routes>
  );
}

export default App;
