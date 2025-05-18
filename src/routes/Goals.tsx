
import { useEffect, useState } from 'react';

type Goal = {
    id: number;
    title: string;
    completed: boolean
}

export default function Goals() {

    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        fetch("https://brighsteps-api.vercel.app/api/goals")
            .then(res => res.json())
            .then(data => setGoals(data))
            .catch(err => console.log('Something failed', err));
    }, [])


    return (
        <>
            This is the goals page

            {goals.map((goal: { id: number; title: string; completed: boolean }) => (
                <li key={goal.id}>
                    <span className={goal.completed ? "line-through text-gray-500" : ''}>
                        {goal.title}
                    </span>
                </li>
            ))}
        </>
    );
}