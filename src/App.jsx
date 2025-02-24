import React, { useContext } from 'react';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointments from './pages/Appointments';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import { AppContext } from './context/AppContext';
import BloodBank from './pages/BloodBank';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const{theme,toggleTheme} = useContext(AppContext)
  return (
    <div className='container-fluid mt-2 mb-2'>
       <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
        <button onClick={toggleTheme} style={{marginLeft:'1370px',marginTop:'10px',borderRadius:'5px'}}>  {theme === "light" ? "Dark" : "Light"} Mode</button>
     <ToastContainer />
      <CustomNavbar />
   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />}/>
        <Route path='/my-appointments' element={<MyAppointments />} /> 
        <Route path='/appointment/:docId' element={<Appointments />}/>
        <Route path='/bloodbank' element={<BloodBank />}/>
      </Routes>
      <Footer />
      <button onClick={toggleTheme} style={{marginLeft:'1370px',marginBottom:'40px',borderRadius:'5px'}}>  {theme === "light" ? "Dark" : "Light"} Mode</button>
    </div>
    </div>
  );
}

export default App;
