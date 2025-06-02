import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';

export default function GoalsCalendar() {

    moment.locale('en-GB');
    const localizer = momentLocalizer(moment);
    const { t } = useTranslation();
    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-gray-50 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700">{t('menu.calendar')}</h1>

            <div style={{ height: 700 }}>
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    step={60}
                    defaultDate={new Date()}
                    popup={false}
                />
            </div>
        </div>
    );
}