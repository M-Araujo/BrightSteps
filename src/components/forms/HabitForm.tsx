import { Label, TextInput, Select, Checkbox, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useGoalsAndHabits } from '../../hooks/useGoalsAndHabits';
import Modal from '../modals/CreateModal.tsx';
import toast from 'react-hot-toast';
import type { HabitFormProps, HabitsFormData } from '../../types.tsx';

export default function HabitForm({ show, onClose }: HabitFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<HabitsFormData>();
    const { i18n, t } = useTranslation();
    const { goals, updateGoals } = useGoalsAndHabits();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';


    const daysOfWeek = Array.from({ length: 7 }, (_, i) => ({
        value: i + 1, // 1 to 7
        label: t(`habits.days.${i + 1}`),
    }));

    const onSubmit = (formData: HabitsFormData) => {
        const newHabit = {
            id: Math.floor(Math.random() * 1000000),
            title: {
                en: formData.title,
                pt: formData.title
            },
            goalId: formData.goalId,
            frequency: formData.frequency
        }

        const updatedGoals = goals.map(goal => {
            if (goal.id !== Number(newHabit.goalId)) return goal;
            const updatedHabits = goal.habits ? [...goal.habits, newHabit] : [newHabit];
            return { ...goal, habits: updatedHabits };
        });

        updateGoals(updatedGoals);
        onClose();
        toast.success('Habit created successfully!');
    }

    return (
        <>
            <Modal
                show={show}
                title="Add habit"
                onClose={onClose}>
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

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title">Goals</Label>
                        </div>

                        {goals &&
                            <Select id="goalId"  {...register("goalId", {
                                required: { value: true, message: t('common.requiredField') },
                                validate: {
                                    isNumber: (value) =>
                                        !isNaN(Number(value)) || 'invalid number',
                                    minValue: (value) => Number(value) >= 1 || 'min value 1'

                                }
                            })}>
                                <option value=""></option>
                                {goals.map((goal, index) => (
                                    <option value={goal.id} key={goal.id || index}>{goal.title[lang]}</option>
                                ))}
                            </Select>
                        }
                        {errors.goalId && (
                            <p className="mt-1 text-sm text-red-600">{errors.goalId.message}</p>
                        )}
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="frequency">Frequency</Label>
                        </div>

                        <div >
                            <div className="flex gap-3">
                                {daysOfWeek.map((day) => (
                                    <Label
                                        key={day.value}
                                        htmlFor={`day-${day.value}`}
                                        className="flex items-center gap-1"
                                    >
                                        <Checkbox
                                            id={`day-${day.value}`}
                                            value={day.value}
                                            {...register("frequency", {
                                                validate: (value) => {
                                                    if (Array.isArray(value) && value.length > 0) return true;
                                                    return 'required field';
                                                }
                                            })}
                                        />
                                        {day.label}
                                    </Label>
                                ))}
                            </div>
                            {errors.frequency && (
                                <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button color="gray" onClick={onClose}> {t('modals.cancel')}</Button>
                        <Button
                            type="submit"
                            color="success"
                            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform hover:scale-[1.05]"
                        >
                            {t('modals.submit')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}