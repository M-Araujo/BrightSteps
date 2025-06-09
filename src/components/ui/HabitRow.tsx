import { useState } from 'react';
import type { HabitRowProps } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HabitForm from '../../components/modals/forms/HabitForm.tsx';

export default function HabitRow({ goal, habit, lang, onDeleteRequest }: HabitRowProps) {

    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    console.log('goal', goal);
    console.log('habit', habit);



    return (
        <>
            <div
                key={habit.id}
                className="grid grid-cols-4 items-center px-4 py-3 bg-white rounded-lg shadow transition hover:shadow-md"
            >
                <div className="flex justify-start">{habit.title[lang]}</div>
                <div className="flex justify-start">{goal.title[lang]}</div>
                <div className="flex justify-start">
                    {habit.frequency.map((item: number, index: number) => (
                        <span className="flex justify-start text-xs" key={item}>{t(`habits.days.${item}`)} {index < habit.frequency.length - 1 ? ', ' : ''}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowModal(true)} className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Edit">
                        <Pencil size={18} />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 transition-colors" aria-label="Delete" onClick={() => onDeleteRequest(habit)}>
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <HabitForm item={habit} lang={lang} show={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}