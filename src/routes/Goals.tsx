import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Label, TextInput } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import GoalRow from './../components/ui/GoalRow.tsx';
import toast from 'react-hot-toast';
import DeleteModal from './../components/modals/DeleteModal.tsx';
import useGoalsAndHabits from '../hooks/useGoalsAndHabits.tsx';

type Goal = {
    id: number;
    title: {
        en: string;
        pt: string;
    };
    completed: boolean;
    startDate?: string;
    endDate?: string;
};
type GoalFormData = {
    title: string;
    startDate: string;
    endDate: string;
}


export default function Goals() {
    const { i18n, t } = useTranslation();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    const [goals, setGoals] = useGoalsAndHabits();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<GoalFormData>();
    const startDate = watch('startDate'); // the purpose is dates validation
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);


    const onSubmit = (data: GoalFormData) => {
        const newGoal: Goal = {
            id: Math.floor(Math.random() * 1000000),
            title: {
                en: data.title,
                pt: data.title
            },
            completed: false,
            startDate: data.startDate,
            endDate: data.endDate,
        }

        setGoals(goals => {
            const updated = [...goals, newGoal];
            localStorage.setItem('goalsAndHabits', JSON.stringify(updated));
            return updated;
        });

        toast.success('Goal added successfully!');
        setOpenModal(false);
        reset();
    }
    //localStorage.clear();

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

        setGoals(filteredGoals);
        setShowDeleteModal(false);
        toast.success('Goal deleted successfully!');
        localStorage.setItem('goalsAndHabits', JSON.stringify(filteredGoals));
        // TODO convinha ter uma função helper para fazer o update para o localstorage
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700">{t('goals.title', 'Goals')}</h1>

            <div className="flex justify-end mb-4">

                <Button onClick={() => setOpenModal(true)}>{t('goals.add')}</Button>

                <AnimatePresence>
                    {openModal && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                            onClick={() => setOpenModal(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-title"
                                aria-describedby="modal-description"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
                                initial={{ scale: 0.95, y: 40, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.95, y: 40, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('goals.createGoal')}</h3>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="title">{t('common.title')}</Label>
                                            </div>
                                            <TextInput type="text" {...register("title", {
                                                required: { value: true, message: t('common.requiredField') },
                                                minLength: { value: 3, message: t('common.min3Chars') },
                                                maxLength: { value: 100, message: t('common.max100Chars') }
                                            })} />
                                            {errors.title && (
                                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="start-date">{t('goals.startDate')}</Label>
                                                </div>
                                                <input type="date" {...register('startDate', {
                                                    required: t('common.requiredField')
                                                })} />
                                                {errors.startDate && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                                                )}

                                            </div>

                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="end-date">{t('goals.endDate')}</Label>
                                                </div>
                                                <input type="date" {...register('endDate', {
                                                    required: t('common.requiredField'),
                                                    validate: value => {
                                                        if (!value) return t('common.requiredField');
                                                        if (startDate && value < startDate) {
                                                            return t('common.endDateTooEarly');
                                                        }
                                                        return true;
                                                    }
                                                })} />
                                                {errors.endDate && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                                                )}

                                            </div>
                                        </div>

                                        <div className="flex justify-end items-center gap-2 pt-4">

                                            <Button color="gray" onClick={() => setOpenModal(false)}> {t('modals.cancel')}</Button>
                                            <Button
                                                type="submit"
                                                color="success"
                                                className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform hover:scale-[1.05]"
                                            >
                                                {t('modals.submit')}
                                            </Button>
                                        </div>
                                    </form>
                                </div>


                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>


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

            <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleConfirmDelete} itemName={goalToDelete?.title[lang]} />
        </div>
    );
}
