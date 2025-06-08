import { Label, TextInput, Button } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import Modal from '../Modal.tsx';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import type { FormProps, GoalsFormData, Goal } from '../../../types.tsx';
import { useGoalsAndHabits } from '../../../hooks/useGoalsAndHabits.tsx';

export default function GoalForm({ show, onClose, item, lang }: FormProps) {
    const { t } = useTranslation();
    const defaultValues = {
        title: item?.title[lang] || '',
        startDate: item?.startDate || '',
        endDate: item?.endDate || '',
    }
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<GoalsFormData>({ defaultValues });
    const startDate = watch('startDate');
    const { goals, updateGoals } = useGoalsAndHabits();


    console.log('item', item);

    const onSubmit = (formData: GoalsFormData) => {
        console.log('onSubmit ran');

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
        localStorage.setItem('goalsAndHabits', JSON.stringify(updatedGoals))

        toast.success(item ? t('goals.updateSuccess') : t('goals.addSuccess'));
        onClose();
        reset();
    };

    return (
        <Modal
            show={show}
            title={t('goals.addGoal', 'Add Goal')}
            onClose={onClose}
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
                    <Button color="gray" onClick={() => { onClose(); reset(); }}>
                        {t('modals.cancel')}
                    </Button>
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
    );
}