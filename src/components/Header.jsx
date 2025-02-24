import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <>
   
   <div className="container bg-primary mt-4 d-flex justify-content-evenly flex-wrap text-white">
    
        {/* ....leftside...... */}
        <div >
         <h1 className='p-2 mt-5 '>Book Appointment <br />With Trusted Doctors</h1>
         <img src={assets.group_profiles} alt="group-profiles" className='p-2 mt-3' />
         <p className='p-1 my-3'>Simply browse through our extensive list of trusted doctors, <br /> schedule your appointment hassle-free.</p>
         <a href="#speciality" className='rounded-pill btn btn-light p-2 '>Book Appointment <img src={assets.arrow_icon} alt="" /></a>
        </div>
        {/* .....rightside..... */}
        <div>
         <img src={assets.header_img} alt=""  className='w-100'/>
        </div>
    </div>
   
    </>
    
  );
}

export default Header;
