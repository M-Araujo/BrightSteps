import { useTranslation } from 'react-i18next'
import Card from './../components/ui/Card.tsx';

export default function Dashboard() {

    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div className="sm:col-span-2 lg:col-span-2">
                <Card>{t('dashboard.welcome')}</Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>{t('dashboard.card1')}</Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>{t('dashboard.summary')} </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>{t('dashboard.tip')} </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>{t('dashboard.inspiration')}</Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>{t('dashboard.mentors')}</Card>
            </div>
        </div>
    );
}
