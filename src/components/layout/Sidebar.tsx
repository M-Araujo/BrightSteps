import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Target, Repeat, Calendar, BarChart, Lightbulb, Info, Settings } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
    const { t } = useTranslation();
    const iconClass = 'w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition';
    const linkClass = 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group';
    const activeClass = 'bg-gray-100 dark:bg-gray-700';

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto text-left">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                                onClick={closeSidebar}
                            >
                                <LayoutDashboard className={iconClass} />
                                <span className="ml-3">{t('menu.dashboard', 'Dashboard')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/goals"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                                onClick={closeSidebar}
                            >
                                <Target className={iconClass} />
                                <span className="ml-3">{t('menu.goals', 'Goals')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/habits"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                                onClick={closeSidebar}
                            >
                                <Repeat className={iconClass} />
                                <span className="ml-3">{t('menu.habits', 'Habits')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/calendar"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                                onClick={closeSidebar}
                            >
                                <Calendar className={iconClass} />
                                <span className="ml-3">{t('menu.calendar', 'Calendar')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/stats"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                                onClick={closeSidebar}
                            >
                                <BarChart className={iconClass} />
                                <span className="ml-3">{t('menu.stats', 'Stats')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/tips"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                                onClick={closeSidebar}
                            >
                                <Lightbulb className={iconClass} />
                                <span className="ml-3">{t('menu.tips', 'Tips')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                                onClick={closeSidebar}
                            >
                                <Info className={iconClass} />
                                <span className="ml-3">{t('menu.about', 'About')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
                                onClick={closeSidebar}
                            >
                                <Settings className={iconClass} />
                                <span className="ml-3">{t('menu.settings', 'Settings')}</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}