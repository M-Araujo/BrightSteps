import { useTranslation } from 'react-i18next';
import { Button } from "flowbite-react";
import useGoalsAndHabits from '../hooks/useGoalsAndHabits.tsx';
import type { Goal } from '../types';
import HabitRow from '../components/ui/HabitRow.tsx';

export default function Habits() {

    const { i18n, t } = useTranslation();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    const [goals] = useGoalsAndHabits<Goal>();

    return (

        <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700">{t('goals.title', 'Habits')}</h1>
            <div className="flex justify-end mb-4">
                <Button>{t('habits.add')}</Button>
            </div>

            <div className="grid grid-cols-4 font-semibold text-sm text-gray-600 bg-white px-4 py-2 rounded-md shadow-sm mb-2">
                <span>🎯 {t('habits.title')}</span>
                <span>📅 {t('habits.goal')}</span>
                <span>📆 {t('habits.frequency')}</span>
                <span>📊 {t('habits.actions')}</span>
            </div>

            {goals && goals.length === 0 && (
                <p className="text-center text-gray-500 py-6">
                    {t('habits.noHabits')}
                </p>
            )}

            <div className="space-y-2">
                {goals.map(goal =>
                    goal.habits?.map(habit => (
                        <HabitRow key={habit.id} goal={goal} habit={habit} lang={lang} />
                    ))
                )}
            </div>
        </div>
    );
}