import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const{token,setToken,userData} =useContext(AppContext)

  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
  return (
    <>
 <Navbar expand="lg" className=" mb-4">
      <Container className='h-20'>
        <Navbar.Brand href="/"><img src={assets.logo} alt="" className='w-44' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-primary text-secondary' />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="m-auto">
            <Nav.Link href="/" className='active fw-bold me-5 a-hover'>HOME</Nav.Link>
            <Nav.Link href="/doctors" className=' fw-bold me-5  a-hover'>ALL DOCTORS</Nav.Link>
            <Nav.Link href="/about" className=' fw-bold me-5  a-hover'>ABOUT</Nav.Link>
            <Nav.Link href="/contact" className=' fw-bold me-5 a-hover'>CONTACT</Nav.Link>
            <Nav.Link href="/bloodbank" className='fw-bold a-hover'>BLOODBANK</Nav.Link>
            </Nav>
          {token ? userData && <div className='d-flex'>
            <img src={userData.image} alt="profile pic" className=' rounded-pill me-2' style={{width:'50px',height:'50px'}} />
        
            <NavDropdown id="basic-nav-dropdown" className='me-5 ms bg-secondary text-center mt-3 text-light rounded-pill' style={{width:'25px', height:'25px',fontSize:'20px'}}>
              <NavDropdown.Item href="/my-profile"className=' '>My profile</NavDropdown.Item>
              <NavDropdown.Item href="/my-appointments"className=''>
                My Appointments
              </NavDropdown.Item>
              <NavDropdown.Item className='me-5' onClick={logout}>Logout</NavDropdown.Item>
             
            </NavDropdown>
    </div>:<button className='btn btn-primary me-3
        px-3 py-2 hover shadow rounded-pill' onClick={()=>navigate('/login')}>Create Account</button>
        }  
</Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
    

  );
}

export default CustomNavbar;
