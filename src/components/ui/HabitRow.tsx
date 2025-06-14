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
                className="grid grid-cols-1 sm:grid-cols-4 p-2 border-b even:bg-[var(--color-container)] odd:bg-transparent hover:bg-[var(--color-card)]"
            >
                <div className="flex justify-start">{habit.title[lang]}</div>
                <div className="flex justify-start text-[var(--color-muted)]">{goal.title[lang]}</div>

                <div className="sm:hidden flex justify-between">
                    <div className="flex justify-start">
                        {habit.frequency.map((item: number, index: number) => (
                            <span className="flex justify-start text-xs text-[var(--color-muted)]" key={item}>{t(`habits.days.${item}`)} {index < habit.frequency.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowModal(true)} className=" text-gray-500 hover:text-blue-600" aria-label="Edit">
                            <Pencil size={18} />
                        </button>
                        <button className="text-gray-500 hover:text-blue-600" aria-label="Delete" onClick={() => onDeleteRequest(habit)}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <div className="flex justify-start">
                        {habit.frequency.map((item: number, index: number) => (
                            <span className="flex justify-start text-xs text-[var(--color-muted)]" key={item}>{t(`habits.days.${item}`)} {index < habit.frequency.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                </div>
                <div className="hidden sm:flex gap-2">
                    <button onClick={() => setShowModal(true)} className=" text-gray-500 hover:text-blue-600" aria-label="Edit">
                        <Pencil size={18} />
                    </button>
                    <button className="text-gray-500 hover:text-blue-600" aria-label="Delete" onClick={() => onDeleteRequest(habit)}>
                        <Trash2 size={18} />
                    </button>
                </div>

            </div>
            <HabitForm item={habit} lang={lang} show={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}