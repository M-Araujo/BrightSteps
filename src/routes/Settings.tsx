import { useState, useContext } from 'react';
import { Button } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { useGoalsAndHabits } from '../context/goalsAndHabits/useGoalsAndHabits.tsx';
import { ThemeContext } from '../context/theme/ThemeContext.tsx';
import Modal from '../components/modals/Modal.tsx';
import toast from 'react-hot-toast';
import ModelActionButton from './../components/ui/ModelActionButton.tsx';
import { Sun, Moon } from 'lucide-react';
import PageTitle from './../components/ui/PageTitle.tsx';

export default function Settings() {
    const { t } = useTranslation();
    const [show, setShow] = useState<boolean>(false);
    const { resetGoals } = useGoalsAndHabits();
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('ThemeContext not found. Did you forget to wrap your app in <ThemeProvider>?');
    }

    const { theme, toggleTheme } = themeContext;

    const resetAllData = () => {
        resetGoals();
        setShow(false);
        toast.success(t('settings.resetSuccessfull'));
    };

    return (
        <div
            className={`max-w-5xl mx-auto px-6 py-10 bg-[var(--color-container)] rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 ${theme === 'light' ? 'text-[var(--color-text)]' : 'text-[var(--color-text)]'}`}
        >
            <PageTitle title={t('menu.settings')} />

            <div className="mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">{t('settings.theme')}</h2>
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={toggleTheme}
                        className="bg-[var(--color-primary)] text-white shadow-md"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                    <span className="text-sm">{t('settings.currentTheme')} {theme}</span>
                </div>
            </div>

            <div className="mb-8 p-4 bg-[var(--color-card)] rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">{t('settings.reset')}</h2>
                <p className="mb-4 text-sm">{t('settings.resetAllData')}</p>
                <Button
                    onClick={() => setShow(true)}
                    className="px-6 py-2 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-hover)] active:bg-[var(--color-primary)] transition transform hover:scale-[1.05] shadow-md"
                >
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
                    <ModelActionButton onClick={() => setShow(false)} text={t('modals.cancel')} variant={'cancel'} />
                    <ModelActionButton onClick={resetAllData} text={t('modals.reset')} variant={'failure'} />
                </div>
            </Modal>
        </div>
    );
}