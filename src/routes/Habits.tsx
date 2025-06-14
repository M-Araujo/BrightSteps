import { useTranslation } from 'react-i18next';
import { Button } from "flowbite-react";
import { useState, useEffect } from 'react';
import type { Habit } from '../types';
import { useGoalsAndHabits } from '../hooks/useGoalsAndHabits';
import HabitRow from '../components/ui/HabitRow.tsx';
import toast from 'react-hot-toast';
import HabitForm from '../components/modals/forms/HabitForm.tsx';
import DeleteConfirmation from '../components/modals/DeleteConfirmation.tsx';

export default function Habits() {

    const { i18n, t } = useTranslation();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
    const { goals, updateGoals } = useGoalsAndHabits();
    const [showAddModal, setShowAddModal] = useState(false);


    useEffect(() => { }, [i18n.language, i18n.isInitialized]);


    // set the habit to delete
    const handleDeleteRequest = (habit: Habit) => {
        console.log('habit to delete called');
        setHabitToDelete(habit);
        setShowDeleteModal(true);
    }

    // shows modal
    const handleConfirmDelete = () => {
        const filteredHabits = goals.map(goal => ({
            ...goal,
            habits: goal.habits?.filter(habit => habit.id !== habitToDelete?.id) || []
        }));

        updateGoals(filteredHabits);
        setShowDeleteModal(false);
        toast.success('Habit deleted successfully!');
        localStorage.setItem('brightsteps.goalsAndHabits', JSON.stringify(filteredHabits));
    }

    return (

        <div className="max-w-5xl mx-auto px-6 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
            <h1 className="text-2xl font-bold mb-8 border-b pb-2 border-[var(--color-muted)]">{t('menu.habits')}</h1>
            <div className="flex justify-end mb-4">
                <Button onClick={() => setShowAddModal(true)}>{t('habits.add')}</Button>
            </div>

            <div className="overflow-x-auto">
                <div className="grid sm:grid-cols-1 md:grid-cols-4 font-semibold text-sm px-4 py-2 rounded-md shadow-sm mb-2">
                <span>🎯 {t('habits.title')}</span>
                <span>📅 {t('habits.goal')}</span>
                <span>📆 {t('habits.frequency')}</span>
                <span>📊 {t('habits.actions')}</span>
                </div>
                <div className="space-y-2">
                    {goals.map(goal =>
                        goal.habits?.map(habit => (
                            <HabitRow key={habit.id} goal={goal} habit={habit} lang={lang} onDeleteRequest={handleDeleteRequest} />
                        ))
                    )}
                </div>
            </div>

            {goals && goals.length === 0 && (
                <p className="text-center py-6">
                    {t('habits.noHabits')}
                </p>
            )}

            <HabitForm lang={lang} show={showAddModal} onClose={() => setShowAddModal(false)} />
            <DeleteConfirmation title={habitToDelete?.title[lang]} show={showDeleteModal} onConfirm={handleConfirmDelete} onClose={() => {
                setHabitToDelete(null); setShowDeleteModal(false)
            }} />
        </div>
    );
}