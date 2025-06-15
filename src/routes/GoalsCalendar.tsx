import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';
import { useGoalsAndHabits } from '../context/goalsAndHabits/useGoalsAndHabits.tsx';
import { useCallback, useState } from 'react';
import type { Goal, CalendarEvent } from '../types';
import PageTitle from './../components/ui/PageTitle.tsx';

type CalendarView = 'month' | 'week' | 'day' | 'work_week' | 'agenda';

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

    const handleNavigate = useCallback((action: 'PREV' | 'NEXT' | Date) => {
        if (typeof action === 'string') {
            const newDate = moment(date).add(action === 'NEXT' ? 1 : -1, 'month').toDate();
            setDate(newDate);
        } else {
            setDate(action);
        }
    }, [date]);

    const handleView = useCallback((newView: CalendarView) => {
        setView(newView);
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
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
                    views={['month', 'week', 'day']}
                    selectable
                    style={{ zIndex: 1 }}
                    components={{
                        toolbar: (props) => {
                            const viewNames = ['month', 'week', 'day'];
                            return (
                                <div className="rbc-toolbar" style={{ color: 'var(--color-text)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', gap: '0.5rem' }}>
                                    <div>
                                        <button onClick={() => props.onNavigate('PREV')} style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-card)', border: '1px solid var(--color-muted)', marginRight: '0.5rem', padding: '0.25rem 0.5rem' }}>Prev</button>
                                        <button onClick={() => props.onNavigate('NEXT')} style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-card)', border: '1px solid var(--color-muted)', padding: '0.25rem 0.5rem' }}>Next</button>
                                    </div>
                                    <span style={{ color: 'var(--color-text)', margin: '0 1rem' }}>{props.label}</span>
                                    <div>
                                        {viewNames.map((view) => (
                                            <button
                                                key={view}
                                                onClick={() => props.onView(view as CalendarView)}
                                                style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-card)', border: '1px solid var(--color-muted)', marginLeft: '0.5rem', padding: '0.25rem 0.5rem' }}
                                            >
                                                {view.charAt(0).toUpperCase() + view.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        },
                    }}
                />
            </div>
        </div>
    );
}