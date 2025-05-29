import { useState, useEffect } from 'react';

// Optional: remove this Goal type if you're importing it elsewhere
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

export default function useGoalsAndHabits<T = Goal>() {
    const [goals, setGoals] = useState<T[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('goalsAndHabits');

        if (stored) {
            try {
                const localGoals = JSON.parse(stored) as T[];
                setGoals(localGoals);
            } catch (err) {
                console.error("Error parsing localStorage:", err);
            }
        } else {
            fetch("https://brighsteps-api.vercel.app/api/goalsAndHabits")
                .then(res => res.json())
                .then(data => {
                    const fetchedGoals = data.goals as T[]; // Cast to T[]
                    setGoals(fetchedGoals);
                    localStorage.setItem('goalsAndHabits', JSON.stringify(fetchedGoals));
                })
                .catch(err => console.error('Something failed:', err));
        }
    }, []);

    return [goals, setGoals] as const;
}
