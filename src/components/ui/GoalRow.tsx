import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';
import type { GoalRowProps } from '../../types';
import GoalForm from '../../components/modals/forms/GoalForm.tsx';


export default function GoalRow({ goal, lang, onDeleteRequest }: GoalRowProps) {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <div
                key={goal.id}
                className="grid grid-cols-1 sm:grid-cols-5 p-2 border-b even:bg-[var(--color-container)] odd:bg-transparent hover:bg-[var(--color-card)]"
            >
                <span className={goal.completed ? "line-through text-[var(--color-muted)]" : "text-[var(--color-text)]"}>
                    {goal.title[lang] ?? goal.title.en}
                </span>
                <span className="text-[var(--color-muted)]">{goal.startDate ?? '—'}</span>
                <span className="text-[var(--color-muted)]">{goal.endDate ?? '—'}</span>
                <div className="sm:hidden flex justify-between">
                    <span className={`inline-flex gap-1 px-2 py-0.5 text-xs rounded-full font-semibold ${goal.completed ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-accent)] text-white"}`}>
                        {goal.completed ? "🎉" : "🛠️"} {goal.completed ? t('goals.done') : t('goals.inProgress')}
                    </span>
                    <div className="flex gap-2">
                        <button onClick={() => setOpenModal(true)} className="text-gray-500 hover:text-blue-600"><Pencil size={18} /></button>
                        <button onClick={() => onDeleteRequest(goal)} className="text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <span className={`inline-flex gap-1 px-2 py-0.5 text-xs rounded-full font-semibold ${goal.completed ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-accent)] text-white"}`}>
                        {goal.completed ? "🎉" : "🛠️"} {goal.completed ? t('goals.done') : t('goals.inProgress')}
                    </span>
                </div>
                <div className="hidden sm:flex gap-2">
                    <button onClick={() => setOpenModal(true)} className="text-gray-500 hover:text-blue-600"><Pencil size={18} /></button>
                    <button onClick={() => onDeleteRequest(goal)} className="text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
            </div>
            <GoalForm item={goal} lang={lang} show={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
}