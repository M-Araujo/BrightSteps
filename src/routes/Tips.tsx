import { useTranslation } from 'react-i18next';
import { useEffect, useState, useMemo } from 'react';
import type { Tip } from '../types';
import TipRow from '../components/ui/TipRow.tsx';
import PageTitle from './../components/ui/PageTitle.tsx';
import axios from 'axios';
import DataGrid from './../components/ui/DataGrid.tsx';
import { Spinner } from "flowbite-react";

export default function Tips() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'pt';
    const [tips, setTips] = useState<Tip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const gridHeader = useMemo(() => [
        { id: 1, title: '🎯 ' + t('tips.title') },
        { id: 2, title: '📅 ' + t('tips.description') }
    ], [t]);

    useEffect(() => {
        axios.get("https://brighsteps-api.vercel.app/api/tips")
            .then(function (response) {
                setTips(response['data']);
                setLoading(false);
            })
            .catch(function () {
                setLoading(false);
                setError(t('common.errorLoadingData'));
            });
    }, [t]);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 rounded-xl shadow-md bg-[var(--color-container)]">
            <PageTitle title={t('menu.tips')} />

            {loading ? (
                <div className="flex justify-center py-10">
                    <Spinner color="info" aria-label="Loading" />
                </div>
            ) : error ? (
                <div className="flex justify-center py-10">
                    <p className="text-center text-red-600 font-semibold">
                        {error}
                    </p>
                </div>
            ) : (
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
            )}
        </div>
    );
}