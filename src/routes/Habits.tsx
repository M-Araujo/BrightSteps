import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo } from 'react';
import type { Habit } from '../types';
import { useGoalsAndHabits } from '../context/goalsAndHabits/useGoalsAndHabits.tsx';
import HabitRow from '../components/ui/HabitRow.tsx';
import toast from 'react-hot-toast';
import HabitForm from '../components/modals/forms/HabitForm.tsx';
import DeleteConfirmation from '../components/modals/DeleteConfirmationModal.tsx';
import PageTitle from './../components/ui/PageTitle.tsx';
import CreateButton from '../components/ui/CreateButton.tsx';
import DataGrid from './../components/ui/DataGrid.tsx';

export default function Habits() {

    const { i18n, t } = useTranslation();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
    const { goals, updateGoals } = useGoalsAndHabits();
    const [showAddModal, setShowAddModal] = useState(false);
    const gridHeader = useMemo(() => [
        { id: 1, title: '🎯' + ' ' + t('habits.title') },
        { id: 2, title: '📅' + ' ' + t('habits.goal') },
        { id: 3, title: '📆' + ' ' + t('habits.frequency') },
        { id: 4, title: '📊' + ' ' + t('habits.actions') }
      ], [t]);


    useEffect(() => { }, [i18n.language, i18n.isInitialized]);

    // set the habit to delete
    const handleDeleteRequest = (habit: Habit) => {
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
        toast.success(t('common.deletedSuccessfully'));
        localStorage.setItem('brightsteps.goalsAndHabits', JSON.stringify(filteredHabits));
    }

    return (

        <div className="max-w-5xl mx-auto px-6 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
            <PageTitle title={t('menu.habits')} />
            <CreateButton onClick={() => setShowAddModal(true)} text={t('habits.add')} />

            <DataGrid
                gridHeader={gridHeader}
                data={goals.flatMap(goal =>
                    goal.habits?.map(habit => ({ habit, goal })) || []
                )}
                renderRow={({ habit, goal }) => (
                    <HabitRow
                        key={habit.id}
                        habit={habit}
                        goal={goal}
                        lang={lang}
                        onDeleteRequest={handleDeleteRequest}
                    />
                )}
            />
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