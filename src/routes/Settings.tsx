import { useState, useContext } from 'react';
import { Button } from 'flowbite-react';
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
            className={`max-w-5xl mx-auto px-6 py-10 bg-[var(--color-card)] rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 ${theme === 'light' ? 'text-[var(--color-text)]' : 'text-[var(--color-text)]'}`}
        >
            <h1 className="text-2xl font-bold mb-8 border-b pb-2 border-[var(--color-muted)]">{t('menu.settings', 'Settings')}</h1>

            {/* Theme Section */}
            <div className="mb-8 p-4 bg-[var(--color-main-bg)] rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">{t('settings.theme')}</h2>
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={toggleTheme}
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                    <span className="text-sm">{t('settings.currentTheme', `Current: ${theme}`)}</span>
                </div>
            </div>

            {/* Reset Section */}
            <div className="mb-8 p-4 bg-[var(--color-main-bg)] rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">{t('settings.reset')}</h2>
                <p className="mb-4 text-sm">{t('settings.resetAllData')}</p>
                <Button onClick={() => setShow(true)} className="mt-2">
                    {t('settings.reset')}
                </Button>
            </div>

            <Modal
                show={show}
                title={t('settings.settings')}
                onClose={() => setShow(false)}
            >
                <p className="mb-4">{t('settings.resetConfirmation')}</p>
                <p className="mb-4">{t('settings.actionCannotBeUndone')}</p>

                <div className="flex justify-end gap-2">
                    <Button color="gray" onClick={() => setShow(false)}>
                        {t('modals.cancel')}
                    </Button>
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