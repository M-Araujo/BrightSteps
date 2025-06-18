import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: { display: false, text: '' },
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