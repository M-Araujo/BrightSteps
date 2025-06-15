import NavLinks from "../ui/NavLinks";
import { LayoutDashboard, Target, Repeat, Calendar, BarChart, Lightbulb, Info, Settings } from 'lucide-react';


interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {

    const navLinks = [
        { 'link': '/', 'label': 'dashboard', 'icon': LayoutDashboard },
        { 'link': '/goals', 'label': 'goals', 'icon': Target },
        { 'link': '/habits', 'label': 'habits', 'icon': Repeat },
        { 'link': '/calendar', 'label': 'calendar', 'icon': Calendar },
        { 'link': '/stats', 'label': 'stats', 'icon': BarChart },
        { 'link': '/tips', 'label': 'tips', 'icon': Lightbulb },
        { 'link': '/about', 'label': 'about', 'icon': Info },
        { 'link': '/settings', 'label': 'settings', 'icon': Settings }
    ];

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
                    } bg-[var(--color-sidebar-bg)] border-r border-gray-200 sm:translate-x-0 `}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto text-left">
                    <ul className="space-y-2 font-medium">

                        {navLinks && (
                            navLinks.map((link) => (
                                <li>
                                    <NavLinks listItem={link} closeSidebar={closeSidebar} />
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </aside>
        </>
    );
}