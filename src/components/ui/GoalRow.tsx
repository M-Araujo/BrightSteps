
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';


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

type GoalRowProps = {
    goal: Goal;
    lang: string;
};

export default function GoalRow({ goal, lang }: GoalRowProps) {
    const { t } = useTranslation();
    return (
        <>
            <div
                key={goal.id}
                className="grid grid-cols-5 items-center px-4 py-3 bg-white rounded-lg shadow transition hover:shadow-md"
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
                        {goal.completed ? t('goals.done') : t('goals.inProgress')}
                    </span>
                </div>


                <div className="flex items-center gap-2">
                    <button className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Edit">
                        <Pencil size={18} className="stroke-current" />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 transition-colors" aria-label="Delete">
                        <Trash2 size={18} className="stroke-current" />
                    </button>
                </div>

            </div>
        </>
    );
}