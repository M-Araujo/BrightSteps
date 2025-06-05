import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Goal } from '../types';

interface GoalsAndHabitsContextType {
    goals: Goal[];
    updateGoals: (newGoals: Goal[]) => void;
    resetGoals: () => void;
    updateHabit: (id: number) => void;
}

const GoalsAndHabitsContext = createContext<GoalsAndHabitsContextType | undefined>(undefined);
export { GoalsAndHabitsContext }; // Named export

export function GoalsAndHabitsProvider({ children }: { children: ReactNode }) {
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('goalsAndHabits');
        if (stored) {
            // console.log('inside context', stored);
            try {
                const localGoals = JSON.parse(stored) as Goal[];
                setGoals(localGoals);
            } catch (err) {
                console.error('Error parsing localStorage', err);
            }
        } else {
            fetch("https://brighsteps-api.vercel.app/api/goalsAndHabits")
                .then(res => res.json())
                .then(data => {
                    const fetchedGoals = data.goals as Goal[];
                    setGoals(fetchedGoals);
                    localStorage.setItem('goalsAndHabits', JSON.stringify(fetchedGoals));
                })
                .catch(err => console.error('Something failed', err));
        }
    }, []);

    const updateGoals = (newGoals: Goal[]) => {
        setGoals(newGoals);
        localStorage.setItem('goalsAndHabits', JSON.stringify(newGoals));
    };

    const resetGoals = () => {
        setGoals([]);
        localStorage.removeItem('goalsAndHabits');

    }

    const updateHabit = (id: number) => {

        const todaysDate = new Date().toISOString().slice(0, 10);

        const filteredHabits = goals.map((goal) => {

            const updatedHabits = goal['habits']?.map(element => {
                if (element.id == id) {
                    let completions = element.completions || [];
                    if (completions.includes(todaysDate)) {
                        const dateIndex = element['completions'].indexOf(todaysDate);
                        if (dateIndex > -1) {
                            completions = completions.filter((date) => date !== todaysDate);
                            return { ...element, completions };
                        }
                    } else {
                        completions = [...completions, todaysDate];
                        return { ...element, completions };
                    }
                }
                return element;
            });
            return { ...goal, habits: updatedHabits };
        });

        setGoals(filteredHabits);
        localStorage.setItem('goalsAndHabits', JSON.stringify(filteredHabits));
    }

    return (
        <GoalsAndHabitsContext.Provider value={{ goals, updateGoals, resetGoals, updateHabit }}>
            {children}
        </GoalsAndHabitsContext.Provider>
    );
}