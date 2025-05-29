import { useState, useEffect } from 'react';

export default function useGoalsAndHabits() {

    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('goalsAndHabits')) {
            const localGoals = JSON.parse(localStorage.getItem('goalsAndHabits') || []);
            setGoals(localGoals);
        } else {
            fetch("https://brighsteps-api.vercel.app/api/goalsAndHabits")
                .then(res => res.json())
                .then(data => {
                    setGoals(data);
                    localStorage.setItem('goalsAndHabits', JSON.stringify(data['goals']));
                })
                .catch(err => console.log('comething failed', err))
        }
    }, []);

    return [goals, setGoals];
}