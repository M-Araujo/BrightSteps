import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from "flowbite-react";
import { useGoalsAndHabits } from '../context/goalsAndHabits/useGoalsAndHabits.tsx';
import GoalRow from './../components/ui/GoalRow.tsx';
import toast from 'react-hot-toast';
import GoalForm from '../components/modals/forms/GoalForm.tsx';
import PageTitle from './../components/ui/PageTitle.tsx';
import DeleteConfirmation from '../components/modals/DeleteConfirmation.tsx';
import type { Goal } from '../types';
import CreateButton from '../components/ui/CreateButton.tsx';
import DataGrid from './../components/ui/DataGrid.tsx';

export default function Goals() {
    const { i18n, t } = useTranslation();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    const { goals, updateGoals } = useGoalsAndHabits();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
    const [canCreateGoal, setCanCreateGoal] = useState<boolean>(true);
    const maxGoals: number = 10;
    const gridHeader = [
        { id: 1, title: '🎯' + ' ' + t('goals.goal') },
        { id: 2, title: '📅' + ' ' + t('goals.startDate') },
        { id: 3, title: '📆' + ' ' + t('goals.endDate') },
        { id: 4, title: '📊' + ' ' + t('goals.status') },
        { id: 5, title: '📊' + ' ' + t('habits.actions') }
    ];
    // set the goal to delete
    const handleDeleteRequest = (goal: Goal) => {
        setGoalToDelete(goal);
        setShowDeleteModal(true);
    }

    // shows modal
    const handleConfirmDelete = () => {
        const filteredGoals = goals.filter((goal) => {
            return goal.id !== goalToDelete?.id;
        });

        updateGoals(filteredGoals);
        setShowDeleteModal(false);
        toast.success(t('common.deletedSuccessfully'));
        localStorage.setItem('brightsteps.goalsAndHabits', JSON.stringify(filteredGoals));
    }

    useEffect(() => {
        setCanCreateGoal(goals.length < maxGoals);
    }, [goals]);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
            <PageTitle title={t('menu.goals')} />
            {canCreateGoal ?
                <CreateButton onClick={() => setOpenModal(true)} text={t('goals.add')} />
                :
                <div className="flex w-full">
                    <Alert color="failure" className="mx-auto mb-5">
                        {t('goals.maxLimitReached')}
                    </Alert>
                </div>
            }

            <DataGrid
                gridHeader={gridHeader}
                data={goals}
                renderRow={(goal) => (
                    <GoalRow
                        key={goal.id}
                        goal={goal}
                        lang={lang}
                        onDeleteRequest={handleDeleteRequest}
                    />
                )}
            />

            {goals && goals.length === 0 && (
                <p className="text-center py-6">
                    {t('goals.noGoals')}
                </p>
            )}

            <GoalForm lang={lang} show={openModal} onClose={() => setOpenModal(false)} />
            <DeleteConfirmation title={goalToDelete?.title[lang]} show={showDeleteModal} onConfirm={handleConfirmDelete} onClose={() => {
                setGoalToDelete(null); setShowDeleteModal(false)
            }} />
        </div>
    );
}
