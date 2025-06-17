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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/*
const data = {
    labels: ['Tips', 'Goals', 'Habits'],
    datasets: [
        {
            label: 'Activity Count',
            data: [12, 8, 15],
            backgroundColor: '#3b82f6',
            borderRadius: 6,
        },
    ],
};
*/

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

export default function BarChartComponent(data: DataChart) {

    return <div style={{ height: '110px', width: '100%' }}><Bar data={data['data']} options={options} /></div>;
}