import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { Tip } from '../types';
import TipRow from '../components/ui/TipRow.tsx';
import PageTitle from './../components/ui/PageTitle.tsx';
import axios from 'axios';
import DataGrid from './../components/ui/DataGrid.tsx';

export default function Tips() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const [tips, setTips] = useState<Tip[]>([]);
    const gridHeader = [
        { id: 1, title: '🎯' + ' ' + t('tips.title') },
        { id: 2, title: '📅' + ' ' + t('tips.description') }
    ];

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

            <DataGrid
                gridHeader={gridHeader}
                data={tips}
                renderRow={(tip) => (
                    <TipRow
                        key={tip.id}
                        tip={tip}
                        lang={lang}
                    />
                )}
            />
        </div>
    );
}