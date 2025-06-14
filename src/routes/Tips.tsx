import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { Tip } from '../types';
import TipRow from '../components/ui/TipRow.tsx';
import PageTitle from './../components/ui/PageTitle.tsx';
import axios from 'axios';

export default function Tips() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const [tips, setTips] = useState<Tip[]>([]);

    useEffect(() => {
        axios.get("https://brighsteps-api.vercel.app/api/tips")
            .then(function (response) {
                setTips(response['data']);
            })
            .catch(function (error) {
                console.log('Oppps, something went wrong.');
                console.log(error);
            });
    }, []);


    return (
        <div className="max-w-5xl mx-auto px-6 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
            <PageTitle title={t('menu.tips')} />

            <div className="overflow-x-auto">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 font-semibold text-sm px-4 py-2 rounded-md shadow-sm mb-2">
                <span>🎯 {t('tips.title')}</span>
                <span>📅 {t('tips.description')}</span>
            </div>

            <div className="space-y-2">
                {tips && (
                    tips.map((tip) => (
                        <TipRow key={tip.id} tip={tip} lang={lang} />
                    ))
                    )}
                </div>
            </div>
        </div>
    );
}