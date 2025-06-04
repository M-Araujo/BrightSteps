import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';
import { useGoalsAndHabits } from '../hooks/useGoalsAndHabits.tsx';
import { useCallback, useState } from 'react';

interface Goal {
    id: number;
    title: { en: string; pt: string };
    patientId?: string;
    startDate: string;
    endDate?: string;
    completed?: boolean;
    habits?: any[];
}

export default function GoalsCalendar() {
    moment.locale('en-GB');
    const localizer = momentLocalizer(moment);
    const { t, i18n } = useTranslation();
    const { goals } = useGoalsAndHabits();

    const [date, setDate] = useState(new Date());
    const [view, setView] = useState('month');

    const events = goals.map((item: Goal) => ({
        id: item.id,
        title: item.title[i18n.language] || 'Untitled Goal',
        start: moment(item.startDate).toDate(),
        end: moment(item.endDate || item.startDate).toDate(),
    }));

    const handleNavigate = useCallback((newDate: Date, view: string, action: string) => {
        setDate(newDate);
    }, []);

    const handleView = useCallback((newView: string) => {
        setView(newView);
    }, []);


    const handleSelectEvent = useCallback((event: object) => {
        // console.log('Event selected:', event);
    }, []);

    const handleSelectSlot = useCallback((slotInfo: object) => {
        // console.log('Slot selected:', slotInfo);
    }, []);

    const testButtonClick = () => {
        // console.log('Test button clicked');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 bg-gray-50 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700">{t('menu.calendar')}</h1>

            <div style={{ height: 700, position: 'relative' }}>
                <Calendar
                    className="custom-calendar"
                    events={events}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    step={60}
                    date={date}
                    view={view}
                    onNavigate={handleNavigate}
                    onView={handleView}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    views={['month', 'week', 'day']}
                    selectable
                    style={{ zIndex: 1 }}
                />
            </div>
        </div>
    );
}