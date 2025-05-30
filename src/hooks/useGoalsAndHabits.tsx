import { useState, useEffect } from 'react';
import type { Goal } from '../types';


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
