import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import { ThemeProvider } from './context/ThemeContext';
import { GoalsAndHabitsProvider } from './hooks/GoalsAndHabitsContext';
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

  return (
    <AnimatePresence mode="wait">
      <Toaster position="top-right" />
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard />
            </motion.div>
          }
        />
        <Route
          path="/goals"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Goals />
            </motion.div>
          }
        />
        <Route
          path="/habits"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Habits />
            </motion.div>
          }
        />
        <Route
          path="/calendar"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GoalsCalendar />
            </motion.div>
          }
        />
        <Route
          path="/stats"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Stats />
            </motion.div>
          }
        />
        <Route
          path="/tips"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Tips />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/settings"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Settings />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
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