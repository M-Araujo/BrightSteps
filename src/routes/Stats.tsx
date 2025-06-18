import PageTitle from './../components/ui/PageTitle.tsx';
import { useTranslation } from 'react-i18next';
import BarChartComponent from '../components/charts/BarChartComponent.tsx';
import DonutChartComponent from '../components/charts/DonutChartComponent.tsx';
import LineChartComponent from '../components/charts/LineChartComponent.tsx';
import { buildDonutData, buildWeeklyHabitCompletionTimeline, buildWeeklyProgressBarChart, } from './../lib/charts/chartDataBuilders.ts';
import { useGoalsAndHabits } from '../context/goalsAndHabits/useGoalsAndHabits.tsx';


import { CardContent } from "./../components/ui/Card.tsx";

export default function Stats() {

    const { t } = useTranslation();
    const { goals } = useGoalsAndHabits();
    const chartData = buildDonutData(goals);
    const habitCompletionTimeline = buildWeeklyHabitCompletionTimeline(goals, t);
    const weeklyHabitProgress = buildWeeklyProgressBarChart(goals);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
            <PageTitle title={t('menu.stats')} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">

                <div className="sm:col-span-2 lg:col-span-2 mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                    <p className="justify-center flex items-center">Weekly habit completion</p>
                    <div className="justify-center flex items-center space-x-4">
                        <CardContent className="p-0 h-full">
                            <LineChartComponent data={habitCompletionTimeline} />

                        </CardContent>
                    </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-2 mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                    <p className="justify-center flex items-center">Today's Habit Completion</p>
                    <div className="justify-center flex items-center space-x-4">
                        <CardContent className="p-0 h-full">
                            <DonutChartComponent data={chartData} />
                        </CardContent>
                    </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-2 mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                    <p className="justify-center flex items-center">Weekly Habit Progress</p>
                    <div className="justify-center flex items-center space-x-4">
                        <CardContent className="p-0 h-full">
                            <BarChartComponent data={weeklyHabitProgress} />
                        </CardContent>
                    </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-2 mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                    <p className="justify-center flex items-center">This is another chart</p>
                    <div className="justify-center flex items-center space-x-4">
                        <CardContent className="p-0 h-full">
                            {/*
                            <LineChartComponent />
                             */}
                        </CardContent>
                    </div>
                </div>
            </div>
        </div >
    );
}