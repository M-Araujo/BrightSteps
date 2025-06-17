import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
};

export default function DonutChartComponent(data) {
    return <div style={{ height: '110px', width: '100%' }}><Doughnut data={data['data']} options={options} /></div>;
}