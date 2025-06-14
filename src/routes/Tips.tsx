import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { Tip } from '../types';
import TipRow from '../components/ui/TipRow.tsx';

export default function Tips() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const [tips, setTips] = useState<Tip[]>([]);


    useEffect(() => {
        fetch("https://brighsteps-api.vercel.app/api/tips")
            .then(res => {
                return res.json();
            })
            .then(data => {
                setTips(data);
            })
            .catch(err => console.error("Fetch error:", err));
    }, []);


    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-100">{t('tips.title')}</h1>

            <div className="grid grid-cols-2 font-semibold text-sm text-gray-600 bg-white px-4 py-2 rounded-md shadow-sm mb-2">
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
    );
}