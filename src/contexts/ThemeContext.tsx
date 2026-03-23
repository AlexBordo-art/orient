import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'night' | 'day';

interface ThemeContextValue {
    theme: Theme;
    toggle: () => void;
    isDay: boolean;
    isNight: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'night',
    toggle: () => {},
    isDay: false,
    isNight: true,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('oe-theme') as Theme | null;
        return saved === 'day' ? 'day' : 'night';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('oe-theme', theme);
    }, [theme]);

    const toggle = useCallback(() => {
        setTheme(prev => prev === 'night' ? 'day' : 'night');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggle, isDay: theme === 'day', isNight: theme === 'night' }}>
            {children}
        </ThemeContext.Provider>
    );
};
