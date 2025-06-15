import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ReactNode } from 'react';
import type { ThemeMode } from '../../types';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeMode | null>(null);

    useEffect(() => {
        let mode = localStorage.getItem('brightsteps.mode') as ThemeMode;
        if (!mode) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            mode = prefersDark ? 'dark' : 'light';
            localStorage.setItem('brightsteps.mode', mode);
        }
        setTheme(mode);
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.remove('theme-dark', 'theme-light');
            document.documentElement.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
        }
    }, [theme]);

    const toggleTheme = () => {
        const newMode: ThemeMode = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('brightsteps.mode', newMode);
        setTheme(newMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
