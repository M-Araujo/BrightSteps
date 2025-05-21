import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Target, Repeat, Calendar, BarChart, Lightbulb, Info, Settings } from "lucide-react";

export default function Sidebar() {
    const { t } = useTranslation();
    const iconClass = "w-5 h-5 text-gray-600 group-hover:text-blue-600 transition";

    return (
        <>
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full
                    bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 text-left">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                                    hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <LayoutDashboard className={iconClass} />
                                <span className="ms-3">{t('menu.dashboard')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/goals"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                                    hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <Target className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.goals')}</span>

                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                                    hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <Repeat className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.habits')}</span>

                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                                    hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <Calendar className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.calendar')}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                                    hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <BarChart className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.stats')}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                                    hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <Lightbulb className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.tips')}</span>
                            </a>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                                    hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <Info className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.about')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                                    hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <Settings className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.settings')}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
