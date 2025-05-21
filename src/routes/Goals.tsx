import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Goal = {
    id: number;
    title: {
        en: string;
        pt: string;
    };
    completed: boolean;
};

export default function Goals() {
    const { i18n, t } = useTranslation();
    const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        fetch("https://brighsteps-api.vercel.app/api/goals")
            .then(res => res.json())
            .then(data => setGoals(data)) // Flatten the response
            .catch(err => console.log('Something failed', err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-lg font-semibold mb-6 text-gray-700">{t('goals.title', 'Goals')}</h1>


            <div className="space-y-2">
                <div className="grid grid-cols-4 font-semibold text-sm text-gray-600 px-3">
                    <span>Goal</span>
                    <span>Start</span>
                    <span>End</span>
                    <span>Status</span>
                </div>

                {goals.map((goal) => (
                    <div key={goal.id} className="grid grid-cols-4 items-center p-3 border rounded-md bg-white shadow-sm text-sm">
                        <span className={goal.completed ? "line-through text-gray-500" : ""}>
                            {goal.title[lang] ?? goal.title.en}
                        </span>
                        <span>{goal.startDate}</span>
                        <span>{goal.endDate}</span>
                        <span className={goal.completed ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                            {goal.completed ? "🎉 All done!" : "🛠️ Still working on it..."}
                        </span>
                    </div>
                ))}
            </div>


        </div>
    );
}
