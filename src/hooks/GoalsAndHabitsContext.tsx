import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Goal } from '../types';
import axios from 'axios';


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

    const validateGoals = (data: unknown): data is Goal[] => {
        return (
            Array.isArray(data) &&
            data.every(
                g =>
                    typeof g === 'object' &&
                    'id' in g &&
                    'title' in g &&
                    typeof g.title === 'object' &&
                    'en' in g.title &&
                    'pt' in g.title &&
                    'completed' in g &&
                    'startDate' in g &&
                    'endDate' in g
            )
        );
    }


    const fetchGoals = () => {
        axios.get('https://brighsteps-api.vercel.app/api/goalsAndHabits')
            .then(function (response) {
                const fetchedGoals = response['data'].goals as Goal[];
                setGoals(fetchedGoals);
                localStorage.setItem('goalsAndHabits', JSON.stringify(fetchedGoals));
            })
            .catch(function (error) {
                console.log('Oppps, something went wrong.');
                console.log(error);
            });
    }


    useEffect(() => {
        const stored = localStorage.getItem('goalsAndHabits');
        if (stored && stored !== 'undefined') {
            try {
                const localGoals = JSON.parse(stored);
                if (validateGoals(localGoals)) {
                    setGoals(localGoals);
                } else {
                    console.log('invalid goals in loalstorage');
                    localStorage.removeItem('goalsAndHabits');
                    fetchGoals();
                }

            } catch (err) {
                console.log('Error parsing localStorage', err);
                localStorage.removeItem('goalsAndHabits');
                fetchGoals();
            }
        } else {
            fetchGoals();
        }
    }, []);

    const updateGoals = (newGoals: Goal[]) => {
        setGoals(newGoals);
        localStorage.setItem('goalsAndHabits', JSON.stringify(newGoals));
    };

    const resetGoals = () => {
        setGoals([]);
        localStorage.removeItem('goalsAndHabits');
        fetchGoals();
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