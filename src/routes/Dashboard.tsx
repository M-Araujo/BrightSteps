import { useTranslation } from 'react-i18next'
import Card from './../components/ui/Card.tsx';
import { useEffect, useState } from 'react';



type Movie = {
    id: number;
    title: {
        en?: string;
        pt?: string;
    },
    description: {
        en?: string;
        pt?: string;
    },
    link?: string
};

type Mentor = {
    id: number;
    title: {
        en?: string;
        pt?: string;
    };
    author: string;
    image?: string;
    type: string;
    description: {
        en?: string;
        pt?: string;
    }
}

type Tip = {
    id: number,
    title: {
        en: string;
        pt: string;
    },
    description: {
        en: string;
        pt: string;
    }
}


export default function Dashboard() {

    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const [movie, setMovie] = useState<Movie>();
    const [mentor, setMentor] = useState<Mentor>();
    const [tip, setTip] = useState<Tip>();


    useEffect(() => {
        fetch("https://brighsteps-api.vercel.app/api/dashboard")
            .then(res => res.json())
            .then(data => {
                setMovie(data['movie']);
                setMentor(data['mentor']);
                setTip(data['tip']);
            })
            .catch(err => console.log('something failed', err));
    }, []);


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div className="sm:col-span-2 lg:col-span-2">
                <Card>
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
                <Card>{t('dashboard.card1')}</Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>{t('dashboard.summary')} </Card>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
                <Card>
                    <div className="p-4 bg-muted rounded-md shadow-inner">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('dashboard.tip')}</h2>

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
                <Card>
                    <h2 className="text-lg font-semibold mb-2">{t('dashboard.inspiration')}</h2>

                    {!movie ? (
                        <p className="text-sm text-gray-500">{t('dashboard.loading')}</p>
                    ) : (
                        <>
                            {movie.title?.[lang] && (
                                <p className="text-md font-medium text-primary mb-1">
                                    {movie.title[lang]}
                                </p>
                            )}

                            {movie.description?.[lang] && (
                                <p className="text-sm text-gray-700 mb-3">
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
                <Card>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('dashboard.mentors')}</h2>

                    {mentor && (
                        <>
                            {mentor.title?.[lang] && (
                                <p className="text-md font-medium text-primary mb-1">
                                    {mentor.title[lang]}
                                </p>
                            )}

                            {mentor.description?.[lang] && (
                                <p className="text-sm text-gray-700 mb-3">
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
