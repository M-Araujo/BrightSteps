import { useTranslation } from 'react-i18next';
import { Button } from "flowbite-react";
import { Pencil, Trash2 } from 'lucide-react';
import useGoalsAndHabits from '../hooks/useGoalsAndHabits.tsx';
import type { Goal, Habit } from '../types';

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
                    goal.habits?.map((habit: Habit) => (
                        <div
                            key={habit.id}
                            className="grid grid-cols-4 items-center px-4 py-3 bg-white rounded-lg shadow transition hover:shadow-md"
                        >
                            <div className="flex justify-start">{habit.title[lang]}</div>
                            <div className="flex justify-start">{goal.title[lang]}</div>
                            <div className="flex justify-start">
                                {habit.frequency.map((item: number, index: number) => (
                                    <span className="flex justify-start text-xs" key={item}>{t(`habits.days.${item}`)} {index < habit.frequency.length - 1 ? ', ' : ''}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Edit">
                                    <Pencil size={18} />
                                </button>
                                <button className="text-gray-500 hover:text-red-600 transition-colors" aria-label="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}