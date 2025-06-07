import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Alert } from "flowbite-react";
import { useGoalsAndHabits } from '../hooks/useGoalsAndHabits.tsx';
import GoalRow from './../components/ui/GoalRow.tsx';
import toast from 'react-hot-toast';
import GoalForm from '../components/modals/forms/GoalForm.tsx';
import DeleteConfirmation from '../components/modals/DeleteConfirmation.tsx';
import type { Goal } from '../types';

export default function Goals() {
    const { i18n, t } = useTranslation();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    const { goals, updateGoals } = useGoalsAndHabits();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
    const [canCreateGoal, setCanCreateGoal] = useState<boolean>(true);
    const maxGoals: number = 10;

    // set the goal to delete
    const handleDeleteRequest = (goal: Goal) => {
        setGoalToDelete(goal);
        setShowDeleteModal(true);
    }

    // shows modal
    const handleConfirmDelete = () => {
        const filteredGoals = goals.filter((goal) => {
            return goal.id != goalToDelete?.id;
        });

        updateGoals(filteredGoals);
        setShowDeleteModal(false);
        toast.success('Goal deleted successfully!');
        localStorage.setItem('goalsAndHabits', JSON.stringify(filteredGoals));
    }

    const areGoalsUnderMaxLimit = () => {
        if (goals.length < maxGoals) {
            setCanCreateGoal(true);
        } else {
            setCanCreateGoal(false);
        }
    }

    useEffect(() => {
        areGoalsUnderMaxLimit();
    }, [goals]);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-gray-50 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700">{t('goals.title', 'Goals')}</h1>



            {canCreateGoal ?
                <div className="flex justify-end mb-4">
                    <Button onClick={() => setOpenModal(true)}>{t('goals.add')}</Button>
                </div>
                :
                <div className="flex w-full">
                    <Alert color="failure" className="mx-auto mb-5">
                        {t('goals.maxLimitReached', 'Maximum goal limit reached')}
                    </Alert>
                </div>
            }



            <div className="grid grid-cols-5 font-semibold text-sm text-gray-600 bg-white px-4 py-2 rounded-md shadow-sm mb-2">
                <span>🎯 {t('goals.goal')}</span>
                <span>📅 {t('goals.startDate')}</span>
                <span>📆 {t('goals.endDate')}</span>
                <span>📊 {t('goals.status')}</span>
                <span>📊 {t('goals.actions')}</span>
            </div>

            {goals && goals.length === 0 && (
                <p className="text-center text-gray-500 py-6">
                    {t('goals.noGoals')}
                </p>
            )}

            <div className="space-y-2">
                {goals && goals.map((goal) => (
                    <GoalRow goal={goal} key={goal.id} lang={lang} onDeleteRequest={handleDeleteRequest} />
                ))}
            </div>

            <GoalForm show={openModal} onClose={() => setOpenModal(false)} />
            <DeleteConfirmation title={goalToDelete?.title[lang]} show={showDeleteModal} onConfirm={handleConfirmDelete} onClose={() => {
                setGoalToDelete(null); setShowDeleteModal(false)
            }} />
        </div>
    );
}
