import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate =useNavigate();
  return (
    <>
    <div className='container d-flex flex-wrap gap-5 justify-content-around bg-primary mb-5 docslink'>
         {/*.....leftside.....  */}
    <div className='d-flex flex-column gap-2 text-light mt-5 bg-primary b-container'>
       <p className='fs-1'>Book Appointments</p> 
       <p className='fs-1'>With 100+ Trusted Doctors</p>
       <button  onClick={()=>{navigate('/login');scrollTo(0,0)}} className='btn btn-light rounded-pill w-50 shadow p-2'>Create account</button>
    </div>
     {/* .....rightside..... */}
     <div>
        <img src={assets.appointment_img} alt="" style={{width:'300px'}} />
     </div>

    </div>
     
     

    </>
    
  );
}

export default Banner;
