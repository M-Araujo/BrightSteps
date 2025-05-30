
import Modal from '../modals/CreateModal.tsx';
import { Label, TextInput, Select } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import useGoalsAndHabits from '../../hooks/useGoalsAndHabits.tsx';
import type { HabitFormProps, Goal } from '../../types.tsx';


export default function HabitForm({ show, onClose }: HabitFormProps) {
    const { register, formState: { errors } } = useForm();
    const { i18n, t } = useTranslation();
    const [goals] = useGoalsAndHabits<Goal>();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';

    return (
        <>
            <Modal
                show={show}
                title="Add habit"
                onClose={onClose}>

                <form className="space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title">{t('common.title')}</Label>
                        </div>
                        <TextInput type="text" {...register("title", {
                            required: { value: true, message: t('common.requiredField') },
                            minLength: { value: 3, message: t('common.min3Chars') },
                            maxLength: { value: 100, message: t('common.max100Chars') }
                        })} />
                        {/*errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )*/}
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title">Goals</Label>
                        </div>

                        {goals &&
                            <Select id="countries" required>
                                {goals.map((goal, index) => (
                                    <option key={goal.id || index}>{goal.title[lang]}</option>
                                ))}
                            </Select>
                        }
                    </div>
                </form>
            </Modal>
        </>
    );
}