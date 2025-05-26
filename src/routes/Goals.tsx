import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import GoalRow from './../components/ui/GoalRow.tsx';

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
    const [goals, setGoals] = useState<Goal[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<GoalFormData>();
    const startDate = watch('startDate');

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

        setOpenModal(false);
    }
    //localStorage.clear();

    useEffect(() => {
        if (localStorage.getItem('goalsAndHabits')) {
            const localHabits = JSON.parse(localStorage.getItem('goalsAndHabits') || []);
            setGoals(localHabits);
        } else {
            fetch("https://brighsteps-api.vercel.app/api/goalsAndHabits")
                .then(res => res.json())
                .then(data => {
                    setGoals(data);
                    localStorage.setItem('goalsAndHabits', JSON.stringify(data['goals']));
                })
                .catch(err => console.log('Something failed', err));
        }

    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700">{t('goals.title', 'Goals')}</h1>

            <div className="flex justify-end mb-4">

                <Button onClick={() => setOpenModal(true)}>{t('goals.add')}</Button>
                <Modal show={openModal} size="3xl" popup onClose={() => setOpenModal(false)}>
                    <ModalHeader />
                    <ModalBody className="overflow-visible max-h-none">
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
                                            <Label htmlFor="start-date">Start date</Label>
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
                                            <Label htmlFor="end-date">End date</Label>
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

                                <div className="w-full">
                                    <Button type="submit">{t('common.submit')}</Button>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>
            </div>


            <div className="grid grid-cols-4 font-semibold text-sm text-gray-600 bg-white px-4 py-2 rounded-md shadow-sm mb-2">
                <span>🎯 Goal</span>
                <span>📅 Start</span>
                <span>📆 End</span>
                <span>📊 Status</span>
            </div>

            {goals && goals.length === 0 && (
                <p className="text-center text-gray-500 py-6">
                    🌱 No goals yet. Time to dream big!
                </p>
            )}

            <div className="space-y-2">
                {goals && goals.map((goal) => (
                    <GoalRow goal={goal} key={goal.id} lang={lang} />
                ))}
            </div>
        </div>
    );
}
