import { useTranslation } from "react-i18next";
import { useState } from 'react';

const languages = [
    { code: 'en', label: 'EN', flag: 'flags/gb.svg' },
    { code: 'pt', label: 'PT', flag: 'flags/pt.svg' }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

    const switchLanguage = (code: string) => {
        i18n.changeLanguage(code);
        localStorage.setItem('brightsteps.lang', code);
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left z-50">
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center rounded px-2 py-1 text-sm "
            >
                <div className="w-6 h-6 rounded-full overflow-hidden mr-2 shadow-sm">
                    <img src={currentLang.flag} alt={currentLang.code} className="w-full h-full object-cover" />
                </div>
                {currentLang.code.toUpperCase()}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute mt-2 w-32 shadow bg-white dark:bg-gray-800 rounded">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => switchLanguage(lang.code)}
                            className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-400 text-sm transition-colors duration-200 cursor-pointer rounded"
                        >
                            <div className="w-6 h-6 rounded-full overflow-hidden mr-2 border border-gray-300 shadow-sm dark:bg-gray-700">
                                <img src={lang.flag} alt={lang.code} className="w-full h-full object-cover" />
                            </div>
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
}
