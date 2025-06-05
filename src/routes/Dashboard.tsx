import { useTranslation } from 'react-i18next'
import Card from './../components/ui/Card.tsx';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Checkbox, Label } from "flowbite-react";
import type { Goal, Movie, Mentor, Tip, Habit } from '../types';
import { useGoalsAndHabits } from '../hooks/useGoalsAndHabits';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'

export default function Dashboard() {

    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const [movie, setMovie] = useState<Movie>();
    const [mentor, setMentor] = useState<Mentor>();
    const [tip, setTip] = useState<Tip>();
    const [todaysHabits, setTodaysHabits] = useState<Goal[]>([]);
    const { goals, updateHabit } = useGoalsAndHabits();
    const [confetti, showConfetti] = useState(false);
    const { width, height } = useWindowSize()

    useEffect(() => {
        //localStorage.clear();

        fetch("https://brighsteps-api.vercel.app/api/dashboard")
            .then(res => res.json())
            .then(data => {
                setMovie(data['movie']);
                setMentor(data['mentor']);
                setTip(data['tip']);
            })
            .catch(err => console.log('something failed', err));
    }, []);


    useEffect(() => {

        if (!goals || goals.length === 0) return;

        const currentDay = new Date().getDay();
        const weekday = currentDay === 0 ? 7 : currentDay; // Sunday=7, Monday=1, etc.
        const filtered = goals.map((goal) => {
            const goalHabits = goal.habits ?? [];
            const filteredHabits = goalHabits.filter((habit) =>
                habit.frequency.includes(weekday)
            );
            return {
                ...goal,
                habits: filteredHabits,
            };
        }).filter(goal => goal.habits.length > 0);
        setTodaysHabits(filtered);
    }, [goals])


    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked == true) {
            showConfetti(true);
            setTimeout(function () {
                showConfetti(false);
            }, 7000);
        }

        updateHabit(Number(event.target.id));
        // TODO filter goals only that are todays goals
    }

    const isHabitCompletedForToday = (habit: Habit) => {
        const todaysDate = new Date().toISOString().slice(0, 10);
        if (habit['completions'].includes(todaysDate)) {
            return true;
        }
        return false;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">

            <div className="fixed inset-0 z-50 pointer-events-none">
                {confetti && (
                    <Confetti
                        width={width}
                        height={height}
                        tweenDuration={1000}
                    />
                )}
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card className="h-[12rem] overflow-hidden overflow-y-auto pr-1">
                    <div className="max-w-md mx-auto text-center py-6 px-4">
                        <p className="text-2xl font-semibold text-indigo-600 mb-2">
                            {t('dashboard.welcome')}
                        </p>
                        <p className="text-base text-gray-700 leading-relaxed">
                            {t('dashboard.description')}
                        </p>
                    </div>
                </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card className="h-[12rem] overflow-y-auto pr-2 p-4 rounded-lg ">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.habits')}</h2>

                    {todaysHabits && todaysHabits.map((goal) => (
                        <div key={goal.id} className="mb-6 border-b border-indigo-100 pb-4 last:border-0 last:pb-0">
                            <h3 className="text-md font-semibold text-indigo-600 mb-3 uppercase tracking-wide border-b border-indigo-300 pb-1">
                                {goal.title?.[lang] ?? goal.title.en}
                            </h3>

                            {goal.habits?.map((habit) => (
                                <div
                                    key={habit.id}
                                    className="flex items-center gap-3 mb-2 p-2 rounded-md cursor-pointer hover:bg-indigo-50 transition-colors"
                                >
                                    <Checkbox checked={isHabitCompletedForToday(habit)} onChange={(e) => handleCheckboxChange(e)} id={`${habit.id}`} />
                                    <Label htmlFor={`${habit.id}`} className="cursor-pointer select-none">
                                        {habit.title?.[lang] ?? habit.title?.en}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    ))}
                </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card className="h-[12rem] overflow-hidden overflow-y-auto pr-1">{t('dashboard.summary')} </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card className="h-[12rem] overflow-hidden overflow-y-auto pr-1">
                    <div className="flex flex-col justify-center h-full px-4 overflow-y-auto">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {t('dashboard.tip')}
                        </h2>

                        {tip ? (
                            <>
                                <blockquote className="relative border-l-4 border-primary pl-3 text-gray-800 italic font-serif text-lg leading-relaxed">
                                    <p className="pr-6">"{tip.title[lang]}"</p>
                                </blockquote>
                                <p className="mt-2 text-sm text-gray-600">{tip.description[lang]}</p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">{t('dashboard.loading')}</p>
                        )}
                    </div>
                </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card className="h-[30rem] flex flex-col justify-between">
                    <h2 className="text-lg font-semibold mb-2">{t('dashboard.inspiration')}</h2>

                    {!movie ? (
                        <p className="text-sm text-gray-500">{t('dashboard.loading')}</p>
                    ) : (
                        <>
                            {movie.title?.[lang] && (
                                    <p className="text-md font-medium text-primary mb-1 min-h-[3rem] leading-normal">
                                    {movie.title[lang]}
                                </p>
                            )}

                            {movie.description?.[lang] && (
                                    <p className="text-sm text-gray-700 mb-3 line-clamp-3 min-h-[4rem] leading-normal">
                                    {movie.description[lang]}
                                </p>
                            )}

                            {movie.link && movie.link.includes('youtube.com') && (
                                    <div className="w-full h-60 mt-2 overflow-hidden rounded-md">
                                    <iframe
                                        src={movie.link.replace('watch?v=', 'embed/')}
                                        title="Inspirational Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full rounded-xl"
                                    ></iframe>
                                </div>
                            )}


                            {!movie.link && (
                                <p className="text-xs text-gray-400 mt-2">{t('dashboard.noVideoAvailable')}</p>
                            )}
                        </>
                    )}
                </Card>
            </div>


            <div className="sm:col-span-2 lg:col-span-2">
                <Card className="h-[30rem] flex flex-col justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('dashboard.mentors')}</h2>

                    {mentor && (
                        <>
                            {mentor.title?.[lang] && (
                                <p className="text-md font-medium text-primary mb-1 min-h-[3rem] leading-normal">
                                    {mentor.title[lang]}
                                </p>
                            )}

                            {mentor.description?.[lang] && (
                                <p className="text-sm text-gray-700 mb-3 line-clamp-3 min-h-[4rem] leading-normal">
                                    {mentor.description[lang]}
                                </p>
                            )}

                            {mentor.image ? (
                                <div className="w-full h-60 mt-2 overflow-hidden rounded-md">
                                    <img
                                        src={mentor.image}
                                        alt=""
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                            ) : (

                                mentor.link && mentor.link.includes('youtube.com') && (
                                    <div className="w-full h-60 mt-2 overflow-hidden rounded-md">
                                        <iframe
                                            src={mentor.link.replace('watch?v=', 'embed/')}
                                            title="Inspirational Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full rounded-xl"
                                        ></iframe>
                                    </div>
                                    )
                            )}
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
