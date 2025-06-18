import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { DataChartProps } from './../../types.tsx';


ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: true, position: 'bottom' as const }
};

export default function DonutChartComponent({ data }: DataChartProps) {
    return <div style={{ height: '110px', width: '100%' }}><Doughnut data={data} options={options} /></div>;
}