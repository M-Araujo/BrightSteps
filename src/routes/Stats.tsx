import PageTitle from './../components/ui/PageTitle.tsx';
import { useTranslation } from 'react-i18next';
import BarChartComponent from '../components/charts/BarChartComponent.tsx';
import DonutChartComponent from '../components/charts/DonutChartComponent.tsx';
import LineChartComponent from '../components/charts/LineChartComponent.tsx';
import { CardContent } from "@/components/ui/card";

export default function Stats() {

    const { t } = useTranslation();
    return (
        <div className="max-w-5xl mx-auto px-6 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
            <PageTitle title={t('menu.stats')} />

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">

                <div className="sm:col-span-2 lg:col-span-2 mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                    <p className="justify-center flex items-center">This is a chart</p>
                    <div className="justify-center flex items-center space-x-4">
                        <CardContent className="p-0 h-full">
                            <BarChartComponent />
                        </CardContent>
                    </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-2 mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                    <p className="justify-center flex items-center">This is another chart</p>
                    <div className="justify-center flex items-center space-x-4">
                        <CardContent className="p-0 h-full">
                            <DonutChartComponent />
                        </CardContent>
                    </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-2 mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                    <p className="justify-center flex items-center">This is another chart</p>
                    <div className="justify-center flex items-center space-x-4">
                        <CardContent className="p-0 h-full">
                            <LineChartComponent />
                        </CardContent>
                    </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-2 mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                    <p className="justify-center flex items-center">This is another chart</p>
                    <div className="justify-center flex items-center space-x-4">
                        <CardContent className="p-0 h-full">
                            <LineChartComponent />
                        </CardContent>
                    </div>
                </div>
            </div>
        </div >
    );
}