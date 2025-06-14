import { useState, useContext } from 'react';
import { Button } from "flowbite-react";
import { useTranslation } from 'react-i18next';
import { useGoalsAndHabits } from '../hooks/useGoalsAndHabits.tsx';
import { ThemeContext } from '../context/ThemeContext.tsx';
import Modal from '../components/modals/Modal.tsx';
import toast from 'react-hot-toast';
import { Sun, Moon } from 'lucide-react';

export default function Settings() {
    const { t } = useTranslation();
    const [show, setShow] = useState<boolean>(false);
    const { resetGoals } = useGoalsAndHabits();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const resetAllData = () => {
        resetGoals();
        setShow(false);
        toast.success('Data resetted successfully!');
    };

    return (
        <div
            className={`max-w-5xl mx-auto px-6 py-10 bg-[var(--color-card)] rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 ${theme === 'light' ? 'text-[var(--color-text)]' : 'text-[var(--color-text)]'
                }`}
        >
            <h1 className="text-xl font-semibold mb-6">{t('menu.settings', 'Settings')}</h1>

            <div className="flex justify-start mb-4">
                <div>
                    <Button
                        onClick={toggleTheme}
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            <div className="flex justify-start mb-4">
                <div>{t('settings.resetAllData')}</div>
            </div>
            <div className="flex justify-start mb-4">
                <Button onClick={() => setShow(true)}>{t('settings.reset')}</Button>
            </div>

            <Modal
                show={show}
                title={t('settings.settings')}
                onClose={() => setShow(false)}
            >
                <p>{t('settings.resetConfirmation')}</p>
                <p>{t('settings.actionCannotBeUndone')}</p>

                <div className="flex justify-end gap-2 pt-4">
                    <Button color="gray" onClick={() => setShow(false)}>{t('modals.cancel')}</Button>
                    <Button
                        onClick={resetAllData}
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