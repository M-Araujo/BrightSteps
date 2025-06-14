import { Link } from 'react-router-dom';
import LanguageSwitcher from '../ui/LanguageSwitcher.tsx';
import logoLight from './../../assets/logo-light.svg';
import logoDark from './../../assets/logo-dark.svg';
import { HiMenu, HiX } from 'react-icons/hi';
import { ThemeContext } from './../../context/ThemeContext.tsx';
import { useContext } from 'react';

interface TopbarProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Topbar({ toggleSidebar, isSidebarOpen }: TopbarProps) {

    const { theme } = useContext(ThemeContext);


    return (
        <nav className="fixed top-0 z-50 w-full h-16 bg-[var(--color-topbar-bg)] border-b border-[var(--color-muted)]">
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-[var(--color-muted)] rounded-lg sm:hidden hover:bg-[color-mix(in srgb, var(--color-muted) 10%, transparent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-muted)]"
                        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                    >
                        <span className="sr-only">{isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
                        {isSidebarOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                    </button>
                    <Link to="/" className="flex ml-2">
                        <div className="flex items-center">

                            {theme === 'dark' ?
                                <img src={logoLight} alt="Brightsteps Light" className="h-full" />
                                :
                                <img src={logoDark} alt="Brightsteps Dark" className="h-full" />
                            }


                        </div>
                    </Link>
                </div>
                <div className="flex items-center">
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
}
