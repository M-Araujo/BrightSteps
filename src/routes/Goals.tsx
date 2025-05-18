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
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        fetch("https://brighsteps-api.vercel.app/api/goals")
            .then(res => res.json())
            .then(data => setGoals(data[0])) // Flatten the response
            .catch(err => console.log('Something failed', err));
    }, []);

    return (
        <div className="max-w-xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">{t('goals.title', 'Goals')}</h1>

            <ul className="list-disc pl-5 space-y-2">
                {goals.map((goal) => (
                    <li key={goal.id}>
                        <span className={goal.completed ? "line-through text-gray-500" : ''}>
                            {goal.title[i18n.language] ?? goal.title.en}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
