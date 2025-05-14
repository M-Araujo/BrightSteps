
import './App.css'
import Topbar from './components/layout/Topbar.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
      <Topbar></Topbar>
      <Sidebar></Sidebar>
      <Dashboard />
    </>
  )
}
export default App
