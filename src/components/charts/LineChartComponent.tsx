import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import type { DataChartProps } from './../../types.tsx';
import { useChartOptions } from '../../hooks/useChartOptions';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChartComponent({ data }: DataChartProps) {
    const { colors, baseOptions } = useChartOptions();

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
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5,
                    color: colors.text,
                },
                grid: {
                    color: colors.grid,
                },
            },
            x: {
                ticks: {
                    color: colors.text,
                },
                grid: {
                    color: colors.grid,
                },
            },
        },
    };

    return <div style={{ height: '110px', width: '100%' }}><Line data={data} options={options} /></div>;
}