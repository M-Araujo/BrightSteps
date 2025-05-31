import { useContext } from 'react';
import { GoalsAndHabitsContext } from './GoalsAndHabitsContext';

export function useGoalsAndHabits() {
    const context = useContext(GoalsAndHabitsContext);
    if (!context) {
        throw new Error('useGoalsAndHabits must be used within a GoalsAndHabitsProvider');
    }
    return context;
}