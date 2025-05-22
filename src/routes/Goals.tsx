import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, Textarea, Datepicker } from "flowbite-react";
import { goalSchema } from '../schemas/goalschema';
import type { GoalFormData } from '../schemas/goalschema';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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


export default function Goals() {
    const { i18n, t } = useTranslation();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    const [goals, setGoals] = useState<Goal[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<GoalFormData>({ resolver: zodResolver(goalSchema) });
    const [formData, setFormDataa] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const subimtForm = () => {
        console.log('form submitted');
    }

    useEffect(() => {
        fetch("https://brighsteps-api.vercel.app/api/goals")
            .then(res => res.json())
            .then(data => setGoals(data))
            .catch(err => console.log('Something failed', err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700">{t('goals.title', 'Goals')}</h1>

            <div className="flex justify-end mb-4">

                <Button onClick={() => setOpenModal(true)}>+ Add goal</Button>
                <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)} >
                    <ModalHeader />
                    <ModalBody>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create goal</h3>
                            <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-6">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="title">Title</Label>
                                    </div>
                                    <TextInput id="title" type="text" required />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description">Description</Label>
                                    </div>
                                    <Textarea id="title" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="start-date">Start date</Label>
                                        </div>
                                        <Datepicker id="start-date" />
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="end-date">End date</Label>
                                        </div>
                                        <Datepicker id="end-date" />
                                    </div>
                                </div>


                                <div className="w-full">
                                    <Button>Submit</Button>
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

            {goals.length === 0 && (
                <p className="text-center text-gray-500 py-6">
                    🌱 No goals yet. Time to dream big!
                </p>
            )}

            <div className="space-y-2">
                {goals.map((goal) => (
                    <div
                        key={goal.id}
                        className="grid grid-cols-4 items-center px-4 py-3 bg-white rounded-lg shadow transition hover:shadow-md"
                    >
                        <span className={goal.completed ? "line-through text-gray-500" : "text-gray-800"}>
                            {goal.title[lang] ?? goal.title.en}
                        </span>

                        <span className="text-gray-500">{goal.startDate ?? '—'}</span>
                        <span className="text-gray-500">{goal.endDate ?? '—'}</span>

                        <div className="flex justify-start">
                            <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-semibold ${goal.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                    }`}
                            >
                                {goal.completed ? "🎉" : "🛠️"}
                                {goal.completed ? "All done!" : "In progress"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
