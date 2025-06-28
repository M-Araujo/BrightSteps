import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { DataChartProps } from './../../types.tsx';
import { useChartOptions } from '../../hooks/useChartOptions';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChartComponent({ data }: DataChartProps) {
    const { baseOptions, colors } = useChartOptions();

    const options = {
        ...baseOptions,
        cutout: '70%',
        plugins: {
            ...baseOptions.plugins,
            legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                    color: colors.text,
                },
            },
        },
    };
    return <div style={{ height: '110px', width: '100%' }}><Doughnut data={data} options={options} /></div>;
}