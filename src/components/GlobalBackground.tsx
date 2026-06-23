import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

type Scene = { id: string; day: string; night: string };

// Главная: 3 сцены, каждая снята днём и ночью (один объект — два часа).
// Они мягко сменяют друг друга; тоггл темы плавно переводит весь набор день↔ночь.
const HOME_SCENES: Scene[] = [
    { id: 'mountain', day: '/backgrounds/home-mountain-day.webp', night: '/backgrounds/home-mountain-night.webp' },
    { id: 'torii', day: '/backgrounds/home-torii-day.webp', night: '/backgrounds/home-torii-night.webp' },
    { id: 'sakura', day: '/backgrounds/home-sakura-day.webp', night: '/backgrounds/home-sakura-night.webp' },
];

// Разделы: пока одиночный кадр (без честной пары) — ночь отрисовываем тональным слоем.
const ROUTE_IMAGE: { prefix: string; src: string }[] = [
    { prefix: '/visas', src: '/backgrounds/bg-bambuk.webp' },
    { prefix: '/education', src: '/backgrounds/bg-book.webp' },
    { prefix: '/services', src: '/backgrounds/bg-teacup.webp' },
];

const GlobalBackground: React.FC = () => {
    const { isDay } = useTheme();
    const location = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loaded, setLoaded] = useState<string[]>([]);

    const routeMatch = ROUTE_IMAGE.find(r => location.pathname.startsWith(r.prefix));
    // Маршрут без пары моделируем сценой, где день == ночь (тинт даёт ночь).
    const SCENES: Scene[] = routeMatch
        ? [{ id: routeMatch.prefix, day: routeMatch.src, night: routeMatch.src }]
        : HOME_SCENES;
    const isPaired = !routeMatch; // честные day/night-кадры — тинт не нужен

    // Предзагрузка всех кадров (день + ночь); сброс индекса на смене роута
    useEffect(() => {
        setCurrentIndex(0);
        SCENES.flatMap(s => [s.day, s.night]).forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => setLoaded(prev => prev.includes(src) ? prev : [...prev, src]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    // Мягкая ротация сцен
    useEffect(() => {
        if (SCENES.length < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % SCENES.length);
        }, 16000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SCENES.length]);

    return (
        <div
            className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden transition-colors duration-700"
            style={{ backgroundColor: 'var(--color-bg)' }}
        >
            {SCENES.map((scene, index) => {
                const isCurrent = index === currentIndex;
                return (
                    <div
                        key={scene.id}
                        className="absolute inset-0"
                        style={{
                            opacity: isCurrent ? 1 : 0,
                            transition: 'opacity 3500ms cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: isCurrent ? 11 : 10,
                        }}
                    >
                        {/* День и ночь стопкой — кроссфейд по теме */}
                        <img
                            src={scene.day}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover object-center photo-atmosphere ${isCurrent ? 'animate-ken-burns' : ''}`}
                            style={{ opacity: isDay && loaded.includes(scene.day) ? 1 : 0, transition: 'opacity 900ms ease' }}
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                        <img
                            src={scene.night}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover object-center photo-atmosphere ${isCurrent ? 'animate-ken-burns' : ''}`}
                            style={{ opacity: !isDay && loaded.includes(scene.night) ? 1 : 0, transition: 'opacity 900ms ease' }}
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                    </div>
                );
            })}

            {/* Лёгкая вуаль для читаемости фрост-блоков. Честные пары — почти прозрачно; разделы — ночной тинт. */}
            {isDay ? (
                <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBEB]/20 via-transparent to-[#FFFBEB]/30 z-20 transition-opacity duration-700" />
            ) : isPaired ? (
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian-dark/25 via-transparent to-obsidian-dark/45 z-20 transition-opacity duration-700" />
            ) : (
                <>
                    {/* Раздел без ночного кадра — затемняем сильнее, чтобы светлый кадр читался как ночь */}
                    <div className="absolute inset-0 bg-gradient-to-b from-obsidian-dark/60 via-obsidian/30 to-obsidian-dark/80 z-20 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-sapphire-dark/20 mix-blend-multiply z-20" />
                </>
            )}

            {/* Зерно плёнки */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none noise-bg z-20" />
        </div>
    );
};

export default GlobalBackground;
