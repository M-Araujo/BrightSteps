import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import ThemeProvider from './context/theme/ThemeProvider.tsx';
import { GoalsAndHabitsProvider } from './context/goalsAndHabits/GoalsAndHabitsContext.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Goals from './routes/Goals.tsx';
import Habits from './routes/Habits.tsx';
import GoalsCalendar from './routes/GoalsCalendar.tsx';
import Stats from './routes/Stats.tsx';
import Tips from './routes/Tips.tsx';
import About from './routes/About.tsx';
import Settings from './routes/Settings.tsx';
import { Toaster } from 'react-hot-toast';

function AnimatedRoutes() {
  const location = useLocation();

  const routes = [
    { path: '/', routeComponent: Dashboard },
    { path: '/goals', routeComponent: Goals },
    { path: '/habits', routeComponent: Habits },
    { path: '/calendar', routeComponent: GoalsCalendar },
    { path: '/stats', routeComponent: Stats },
    { path: '/tips', routeComponent: Tips },
    { path: '/about', routeComponent: About },
    { path: '/settings', routeComponent: Settings }
  ];

  return (
    <>
      <Toaster position="top-right" />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, routeComponent: RouteComponent }) => (
            <Route
              key={path}
              path={path}
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RouteComponent />
                </motion.div>
              }
            />
          ))}
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Topbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <main className="flex flex-1">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            <div
              className={`
                flex-1 p-6 mt-16 transition-all duration-300
                ${isSidebarOpen ? 'ml-64' : 'ml-0 sm:ml-64'}
               bg-[var(--color-main-bg)]
                min-h-[calc(100vh-4rem)]
              `}
            >
              <div className="p-4">
                <GoalsAndHabitsProvider>
                  <AnimatedRoutes />
                </GoalsAndHabitsProvider>
              </div>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;