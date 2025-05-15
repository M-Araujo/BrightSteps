import './App.css'
import Topbar from './components/layout/Topbar.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import MainContent from './components/layout/MainContent.tsx';
import Footer from './components/layout/Footer.tsx';


function App() {
  return (
    <>

      <Topbar></Topbar>
      <Sidebar></Sidebar>
      <MainContent></MainContent>
      <Footer></Footer>


      {
      /*

import Dashboard from './components/Dashboard';
      <Dashboard />
     
     */}

    </>
  )
}
export default App
