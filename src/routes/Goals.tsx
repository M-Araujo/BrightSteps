import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg shadow transition">
                    + Add goal
                </button>
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
