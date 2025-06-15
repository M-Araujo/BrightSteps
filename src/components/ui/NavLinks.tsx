import type { NavLinkProps } from '../../types';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NavLinks({ listItem, closeSidebar } : NavLinkProps) {
    const { t } = useTranslation();
    const iconClass = 'w-5 h-5 group-hover:text-blue-600 transition';
    const linkClass = 'flex items-center p-2 rounded-lg hover:bg-gray-100 group';
    const activeClass = 'bg-gray-100 dark:text-blue-600';
    const Icon = listItem.icon;

    return (
        <NavLink
            to={listItem.link}
            end
            className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
            onClick={closeSidebar}
        >
            <Icon className={iconClass} />
            <span className="ml-3">{t(`menu.${listItem.label}`)}</span>
        </NavLink>
    );
}