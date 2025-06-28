import { useContext } from 'react';
import { ThemeContext } from '../context/theme/ThemeContext';

export function useChartOptions() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useChartOptions must be used within a ThemeProvider");

    const { theme } = context;
    const isDark = theme === 'dark';

    const colors = {
        text: isDark ? '#e5e7eb' : '#111827',
        grid: isDark ? '#374151' : '#e5e7eb',
        tooltipBg: isDark ? '#1f2937' : '#fff',
        tooltipTitle: isDark ? '#fff' : '#000',
        tooltipBody: isDark ? '#d1d5db' : '#111827',
    };

    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 20 } },
        plugins: {
            legend: { display: true, position: 'bottom' as const },
            tooltip: {
                backgroundColor: colors.tooltipBg,
                titleColor: colors.tooltipTitle,
                bodyColor: colors.tooltipBody,
            },
        },
    };

    return { isDark, colors, baseOptions };
}
