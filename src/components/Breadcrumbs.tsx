import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

// Breadcrumb label map: URL segment → human-readable label
const LABELS: Record<string, string> = {
    visas: 'Визы',
    tours: 'Путешествия',
    education: 'Образование',
    services: 'Сервисы',
    blog: 'Блог',
    reviews: 'Отзывы',
    about: 'О компании',
    contact: 'Контакты',
    privacy: 'Политика',
    // Spoke pages — visas
    china: 'Китай',
    korea: 'Южная Корея',
    thailand: 'Таиланд',
    schengen: 'Шенген',
    singapore: 'Сингапур',
    india: 'Индия',
    bulgaria: 'Болгария',
    cyprus: 'Кипр',
    // Spoke pages — tours
    russia: 'Россия',
    'hot-deals': 'Горящие туры',
    // Spoke pages — education
    abroad: 'За рубежом',
    languages: 'Языковые школы',
    // Spoke pages — services
    tickets: 'Авиабилеты',
    insurance: 'Страхование',
    guides: 'Гиды',
    'tax-free': 'Tax Free',
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);

    if (segments.length === 0) return null; // No breadcrumbs on homepage

    const crumbs = segments.map((seg, i) => {
        const path = '/' + segments.slice(0, i + 1).join('/');
        const label = LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
        const isLast = i === segments.length - 1;
        return { path, label, isLast };
    });

    return (
        <nav aria-label="Breadcrumb" className="w-full max-w-7xl mx-auto px-6 pt-28 pb-4">
            <ol className="flex items-center gap-2 text-sm text-t-muted font-sans">
                <li>
                    <Link to="/" className="hover:text-t-strong transition-colors flex items-center gap-1">
                        <Home size={14} />
                        <span>Главная</span>
                    </Link>
                </li>
                {crumbs.map(crumb => (
                    <li key={crumb.path} className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-t-subtle" />
                        {crumb.isLast ? (
                            <span className="text-t-strong font-medium">{crumb.label}</span>
                        ) : (
                            <Link to={crumb.path} className="hover:text-t-strong transition-colors">
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
