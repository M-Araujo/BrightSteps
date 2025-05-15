import './App.css'
import Topbar from './components/layout/Topbar.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import MainContent from './components/layout/MainContent.tsx';
import Footer from './components/layout/Footer.tsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <main className="flex-1">
        <Sidebar />
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
