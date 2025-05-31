import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Goal } from '../types';

interface GoalsAndHabitsContextType {
    goals: Goal[];
    updateGoals: (newGoals: Goal[]) => void;
}

const GoalsAndHabitsContext = createContext<GoalsAndHabitsContextType | undefined>(undefined);

export function GoalsAndHabitsProvider({ children }: { children: ReactNode }) {
    const [goals, setGoals] = useState<Goal[]>([]); // Fix: Goal[] instead of Goal

    useEffect(() => {
        const stored = localStorage.getItem('goalsAndHabits');
        if (stored) {
            try {
                const localGoals = JSON.parse(stored) as Goal[];
                setGoals(localGoals);
            } catch (err) {
                console.error('Error parsing localStorage', err);
            }
        } else {
            fetch("https://brighsteps-api.vercel.app/api/goalsAndHabits") // Fix: Correct URL
                .then(res => res.json())
                .then(data => {
                    const fetchedGoals = data.goals as Goal[];
                    setGoals(fetchedGoals);
                    localStorage.setItem('goalsAndHabits', JSON.stringify(fetchedGoals));
                })
                .catch(err => console.error('Something failed', err));
        }
    }, []);

    const updateGoals = (newGoals: Goal[]) => { // Fix: Function name to updateGoals
        setGoals(newGoals);
        localStorage.setItem('goalsAndHabits', JSON.stringify(newGoals)); // Fix: Correct key
    };

    return (
        <GoalsAndHabitsContext.Provider value={{ goals, updateGoals }}>
            {children}
        </GoalsAndHabitsContext.Provider>
    );
}

export function useGoalsAndHabits() {
    const context = useContext(GoalsAndHabitsContext);
    if (!context) {
        throw new Error('useGoalsAndHabits must be used within a GoalsAndHabitsProvider');
    }
    return context;
}