import { Link } from 'react-router-dom';
import LanguageSwitcher from '../ui/LanguageSwitcher.tsx';
import logo2 from '../../assets/logo.svg';
import { HiMenu, HiX } from 'react-icons/hi';

interface TopbarProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Topbar({ toggleSidebar, isSidebarOpen }: TopbarProps) {
    return (
        <nav className="fixed top-0 z-50 w-full h-16 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                    >
                        <span className="sr-only">{isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
                        {isSidebarOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                    </button>
                    <Link to="/" className="flex ml-2">
                        <img src={logo2} alt="Logo" className="h-8" />
                    </Link>
                </div>
                <div className="flex items-center">
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
}