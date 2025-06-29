import type { NavLinkProps } from '../../types';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NavLinks({ listItem, closeSidebar } : NavLinkProps) {
    const { t } = useTranslation();
    const iconClass = 'w-5 h-5 group-hover:text-blue-600 transition';
    const linkClass = 'flex items-center p-2 rounded-lg group transition-colors';
    const activeClass = 'text-[var(--color-text)] bg-[var(--color-container)]';
    const inactiveClass = 'text-[var(--color-muted)] hover:bg-[var(--color-card)] dark:hover:bg-[var(--color-container)]';
    const Icon = listItem.icon;

    return (
        <NavLink
            to={listItem.link}
            end
            className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
            onClick={closeSidebar}
        >
            <Icon className={iconClass} />
            <span className="ml-3">{t(`menu.${listItem.label}`)}</span>
        </NavLink>
    );
}