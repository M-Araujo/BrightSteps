import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

type DataChart = {
    labels: string[];
    datasets: [{
        label: string;
        data: number[];
        backgroundColor: string;
        borderRadius: number;
    }]
}
type BarChartProps = {
    data: DataChart;
};

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

export default function BarChartComponent({ data }: BarChartProps) {
    return <div style={{ height: '110px', width: '100%' }}><Bar data={data} options={options} /></div>;
}