import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';
import { useGoalsAndHabits } from '../hooks/useGoalsAndHabits';
import { useCallback, useState } from 'react';
import type { Habit } from '../types';
import PageTitle from './../components/ui/PageTitle.tsx';

interface Goal {
    id: number;
    title: { en: string; pt: string };
    patientId?: string;
    startDate: string;
    endDate?: string;
    completed?: boolean;
    habits?: Habit[];
}

interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

type CalendarView = 'month' | 'week' | 'day' | 'work_week' | 'agenda'; // Include all View types

export default function GoalsCalendar() {
    moment.locale('en-GB');
    const localizer = momentLocalizer(moment);
    const { t, i18n } = useTranslation();
    const { goals } = useGoalsAndHabits();

    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<CalendarView>('month');

    const events: CalendarEvent[] = goals.map((item: Goal) => {
        const start = moment(item.startDate).toDate();
        const end = item.endDate ? moment(item.endDate).toDate() : start;
        return {
            id: item.id,
            title: item.title[i18n.language as 'en' | 'pt'] || 'Untitled Goal',
            start: isNaN(start.getTime()) ? new Date() : start,
            end: isNaN(end.getTime()) ? start : end,
        };
    });

    const handleNavigate = useCallback((newDate: Date) => {
        setDate(newDate);
    }, []);

    const handleView = useCallback((newView: CalendarView) => {
        setView(newView);
    }, []);

    const handleSelectEvent = useCallback((event: CalendarEvent) => {
        console.log('Event selected:', event);
    }, []);

    const handleSelectSlot = useCallback((slotInfo: { start: Date; end: Date }) => {
        console.log('Slot selected:', slotInfo);
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 bg-gray-50 rounded-xl shadow-md">
            <PageTitle title={t('menu.calendar')} />
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
                    views={['month', 'week', 'day']} // UI limited to these views
                    selectable
                    style={{ zIndex: 1 }}
                />
            </div>
        </div>
    );
}