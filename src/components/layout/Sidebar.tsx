import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Target, Repeat, Calendar, BarChart, Lightbulb, Info, Settings } from "lucide-react";

export default function Sidebar() {
    const { t } = useTranslation();
    const iconClass = "w-5 h-5 text-gray-600 group-hover:text-blue-600 transition";
    const linkClass = 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group';
    const activeClass = 'bg-gray-100 dark:bg-gray-700';

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
                            <NavLink
                                to="/"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                            >
                                <LayoutDashboard className={iconClass} />
                                <span className="ms-3">{t('menu.dashboard')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/goals"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
                                <Target className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.goals')}</span>

                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/habits"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                            >
                                <Repeat className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.habits')}</span>

                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/calendar"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                            >
                                <Calendar className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.calendar')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/stats"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                            >
                                <BarChart className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.stats')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/tips"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                            >
                                <Lightbulb className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.tips')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                            >
                                <Info className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.about')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) => ` ${linkClass} ${isActive ? activeClass : ''}`}
                            >
                                <Settings className={iconClass} />
                                <span className="flex-1 ms-3 whitespace-nowrap">{t('menu.settings')}</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}