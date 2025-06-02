import { useState } from 'react';
import { Button } from "flowbite-react";
import { useTranslation } from 'react-i18next';
import { useGoalsAndHabits } from '../hooks/useGoalsAndHabits.tsx';
import Modal from './../components/modals/Modal.tsx';
import toast from 'react-hot-toast';

export default function Settings() {

    const { t } = useTranslation();
    const [show, setShow] = useState<boolean>(false);
    const { resetGoals } = useGoalsAndHabits();

    const resetAllData = () => {
        resetGoals();
        setShow(false);
        toast.success('Data resetted successfully!');
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-6 text-gray-700">{t('menu.settings', 'Settings')}</h1>
            <div className="flex justify-end mb-4">
                <Button onClick={() => setShow(true)}> {t('settings.reset')}</Button>
            </div>

            <Modal
                show={show}
                title={t('settings.settings')}
                onClose={() => { setShow(false) }}
            >
                <p>{t('settings.resetConfirmation')}</p>
                <p>{t('settings.actionCannotBeUndone')}</p>

                <div className="flex justify-end gap-2 pt-4">
                    <Button color="gray" onClick={() => { setShow(false) }}>
                        {t('modals.cancel')}
                    </Button>
                    <Button
                        onClick={() => { resetAllData() }}
                        type="submit"
                        color="success"
                        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform hover:scale-[1.05]"
                    >
                        {t('modals.reset')}
                    </Button>
                </div>
            </Modal>
        </div>
    );
}