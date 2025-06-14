import { Label, TextInput, Select, Checkbox, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useGoalsAndHabits } from '../../../hooks/useGoalsAndHabits.tsx';
import Modal from '../Modal.tsx';
import toast from 'react-hot-toast';
import type { FormProps, HabitsFormData, Habit } from '../../../types.tsx';

interface HabitFormProps extends Omit<FormProps, 'item'> {
    item?: Habit;
}

export default function HabitForm({ show, onClose, item, lang }: HabitFormProps) {
    const defaultValues = {
        title: item?.title[lang] || '',
        goalId: item?.goalId || 0,
        frequency: item?.frequency || [],
    }

    const { register, handleSubmit, formState: { errors } } = useForm<HabitsFormData>({ defaultValues });
    const { t } = useTranslation();
    const { goals, updateGoals } = useGoalsAndHabits();

    const maxHabitsPerGoal: number = 10;

    console.log(item);


    const daysOfWeek = Array.from({ length: 7 }, (_, i) => ({
        value: i + 1, // 1 to 7
        label: t(`habits.days.${i + 1}`),
    }));

    const onSubmit = (formData: HabitsFormData) => {
        console.log('submitted called');
        const newHabit = {
            id: item ? item.id : Math.floor(Math.random() * 1000000),
            title: {
                en: formData.title,
                pt: formData.title
            },
            goalId: formData.goalId,
            frequency: Array.isArray(formData.frequency) ? formData.frequency.map(Number).filter(n => !isNaN(n)) : [7],
            completions: item ? item.completions : []
        }

        let updatedGoals = goals;
        if (item) {
            updatedGoals = goals.map((goal) => {
                if (goal.id == newHabit.goalId) {
                    const associatedHabits = goal['habits']?.map((habit) => {
                        if (habit.id == item.id) {
                            return newHabit;
                        } else {
                            return habit;
                        }
                    })
                    return { ...goal, habits: associatedHabits }
                } else {
                    return goal;
                }
            });

        } else {
            updatedGoals = goals.map(goal => {
                if (goal.id !== Number(newHabit.goalId)) return goal;
                const updatedHabits = goal.habits ? [...goal.habits, newHabit] : [newHabit];
                return { ...goal, habits: updatedHabits };
            });
        }

        updateGoals(updatedGoals);
        onClose();
        toast.success(item ? t('common.deletedSuccessfully') : t('common.deletedSuccessfully'))
    }

    return (
        <>
            <Modal
                show={show}
                title={item ? t('habits.editHabit') : t('habits.createHabit')}
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
                            <Label htmlFor="title">{t('goals.goal')}</Label>
                        </div>

                        {goals &&
                            <Select id="goalId" {...register("goalId", {
                                required: { value: true, message: t('common.requiredField') },
                                validate: {
                                    isNumber: (value) => !isNaN(Number(value)) || t('common.invalidNumber'),
                                    minValue: (value) => Number(value) >= 1 || t('common.minVal') + '1',
                                },
                            })}>
                                <option value=""></option>
                                {goals.map((goal, index) => (
                                    <option
                                        value={goal.id}
                                        key={goal.id || index}
                                        disabled={(goal?.habits ?? []).length >= maxHabitsPerGoal}
                                    >
                                        {goal.title[lang]} {(goal?.habits ?? []).length >= maxHabitsPerGoal ? '(' + t('habits.maxHabitReached') + ')' : ''}
                                    </option>
                                ))}
                            </Select>
                        }
                        {errors.goalId && (
                            <p className="mt-1 text-sm text-red-600">{errors.goalId.message}</p>
                        )}
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="frequency">{t('habits.frequency')}</Label>
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
                                                validate: (value) => (Array.isArray(value) && value.length > 0) || t('common.requiredField'),
                                            })}
                                            defaultChecked={item?.frequency?.includes(day.value)}
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
                            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform"
                        >
                            {t('modals.submit')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}