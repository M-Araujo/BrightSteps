import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import type { DataChartProps } from './../../types.tsx';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
        x: { ticks: { padding: 0 } },
    },
    layout: { padding: 0 },
};

export default function BarChartComponent({ data }: DataChartProps) {
    return <div style={{ height: '110px', width: '100%' }}><Bar data={data} options={options} /></div>;
}