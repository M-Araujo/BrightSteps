import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/*const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Habit Completion',
            data: [10, 15, 12, 18, 20, 16, 22], // Example data
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.1,
        },
    ],
};*/

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: { display: true, text: 'Weekly Progress', font: { size: 16 } },
        legend: { display: true, position: 'bottom' },
    },
    scales: {
        y: { beginAtZero: true, ticks: { stepSize: 5 } },
    },
    layout: { padding: { top: 20 } },
};

export default function LineChartComponent({ data }) {
    return <div style={{ height: '110px', width: '100%' }}><Line data={data} options={options} /></div>;
}