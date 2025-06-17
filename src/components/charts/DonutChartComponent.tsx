import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
        {
            data: [70, 30], // Example: 70% completed, 30% pending
            backgroundColor: ['#3b82f6', '#d1d5db'],
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
};

export default function DonutChartComponent() {
    return <div style={{ height: '110px', width: '100%' }}><Doughnut data={data} options={options} /></div>;
}