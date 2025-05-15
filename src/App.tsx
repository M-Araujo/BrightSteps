import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/layout/Topbar.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import Footer from './components/layout/Footer.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Goals from './routes/Goals.tsx';


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <main className="flex flex-1">
          <Sidebar />
          <div className="p-4 w-full ml-0 sm:ml-64"> {/* Space for Sidebar */}
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/goals" element={<Goals />} />
              </Routes>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
