import { Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import Modal from '../Modal.tsx';
import toast from 'react-hot-toast';
import ModelActionButton from './../../ui/ModelActionButton.tsx';
import { useTranslation } from 'react-i18next';
import type { FormProps, GoalsFormData, Goal } from '../../../types.tsx';
import { useGoalsAndHabits } from '../../../context/goalsAndHabits/useGoalsAndHabits.tsx';

interface GoalFormProps extends Omit<FormProps, 'item'> {
    item?: Goal;
}

export default function GoalForm({ show, onClose, item, lang }: GoalFormProps) {
    const { t } = useTranslation();
    const defaultValues = {
        title: item?.title[lang] || '',
        startDate: item?.startDate || '',
        endDate: item?.endDate || '',
    }
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<GoalsFormData>({ defaultValues });
    const startDate = watch('startDate');
    const { goals, updateGoals } = useGoalsAndHabits();

    const onSubmit = (formData: GoalsFormData) => {

        const dataGoal: Goal = {
            id: item ? item?.id : Math.floor(Math.random() * 1000000),
            title: {
                en: formData.title,
                pt: formData.title,
            },
            completed: item?.completed ?? false,
            startDate: formData.startDate,
            endDate: formData.endDate,
            habits: item?.habits ?? [],
        };

        let updatedGoals = goals;

        if (item) {
            goals.map((goal) => {
                if (goal.id == item.id) {
                    updatedGoals = goals.map((goal) => goal.id === item.id ? { ...goal, ...dataGoal } : goal);
                }
            });
        } else {
            updatedGoals = [...goals, dataGoal];
        }

        updateGoals(updatedGoals);
        localStorage.setItem('brightsteps.goalsAndHabits', JSON.stringify(updatedGoals))

        toast.success(item ? t('common.updatedSuccessfully') : t('common.createdSuccessfully'));
        onClose();
        reset();
    };

    return (
        <Modal
            show={show}
            title={item ? t('goals.editGoal') : t('goals.createGoal')}
            onClose={() => { onClose(); reset(); }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title">{t('common.title')}</Label>
                    </div>
                    <TextInput
                        id="title"
                        type="text"
                        {...register('title', {
                            required: { value: true, message: t('common.requiredField') },
                            minLength: { value: 3, message: t('common.min3Chars') },
                            maxLength: { value: 100, message: t('common.max100Chars') },
                        })}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="start-date">{t('goals.startDate')}</Label>
                        </div>
                        <TextInput
                            id="start-date"
                            type="date"
                            {...register('startDate', {
                                required: t('common.requiredField'),
                            })}
                        />
                        {errors.startDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                        )}
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="end-date">{t('goals.endDate')}</Label>
                        </div>
                        <TextInput
                            id="end-date"
                            type="date"
                            {...register('endDate', {
                                required: t('common.requiredField'),
                                validate: (value) => {
                                    if (!value) return t('common.requiredField');
                                    if (startDate && value < startDate) {
                                        return t('common.endDateTooEarly');
                                    }
                                    return true;
                                },
                            })}
                        />
                        {errors.endDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <ModelActionButton onClick={onClose} text={t('modals.cancel')} variant={'cancel'} />
                    <ModelActionButton type="submit" text={t('modals.submit')} variant={'create'} />
                </div>
            </form>
        </Modal>
    );
}