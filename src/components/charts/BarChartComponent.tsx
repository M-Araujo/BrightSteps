import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import type { DataChartProps } from './../../types.tsx';
import { useChartOptions } from '../../hooks/useChartOptions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartComponent({ data }: DataChartProps) {
    const { baseOptions, colors } = useChartOptions();

    const options = {
        ...baseOptions,
        plugins: {
            ...baseOptions.plugins,
            legend: {
                ...baseOptions.plugins?.legend,
                labels: {
                    color: colors.text,
                },
            },
            tooltip: {
                ...baseOptions.plugins?.tooltip,
                backgroundColor: colors.tooltipBg,
                titleColor: colors.tooltipTitle,
                bodyColor: colors.tooltipBody,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: colors.text,
                },
                grid: {
                    color: colors.grid,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: colors.text,
                    stepSize: 1,
                },
                grid: {
                    color: colors.grid,
                },
            },
        },
    };


    return <div style={{ height: '110px', width: '100%' }}><Bar data={data} options={options} /></div>;
}