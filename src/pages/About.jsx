import React from 'react';
import { assets } from '../assets/assets';


const About = () => {
  
  return (
    <>
    <div>
          <p className='ms-1 mb-4 text-center fs-4'>ABOUT <span className='fw-bold'>US</span></p>
        </div>
      <div className='container mt-5 mb-5'>
        
        <div className='d-flex gap-5 '>
          <div>
          <img src={assets.about_image} alt="" style={{width:'250px',height:'250px'}} />
          </div>
         
          <div className=' p-2'>
            <p style={{letterSpacing:'0.5px'}}>Welcome to prescripto , your trusted partner in managing your healthcare needs conveniently And effeciently. At Prescripto, We Understand The Challenges Individuals Face When It Comes to Scheduling Doctor Appointments And Their Health Records.  </p>
            <p style={{letterSpacing:'0.5px'}}>Prescripto is committed to Excellence In Technology. We Continiously Strive To Enhance our Platfrom, Integrating The latest Advancements To Improve User Experience And Deliver Superior Service. Whether You Are Booking Your First Appointment Or Managing Ongoing Care, Prescripto Is Here To Support You Every Step Of The Way.  </p>
            <b>Our Vision</b>
            <p style={{letterSpacing:'0.5px'}}>Our Vision At Prescripto Is To Create a Seamless Experience For Every User. We Aim To Bridge The Gap Between Patients And Health care Providers, Making It Easier To Access The Care You Need, When You Need It.</p>
          </div>
        </div>
        <div>
          <p  className=' mt-5 mb-5 fs-4'>WHY <span className='fw-bold'>CHOOSE US</span></p>
        </div>
        <div className='d-flex align-items-center gap-2'>
          <div className='border border-secondary rounded-3 p-5 abouthover'>
            <b className='fs-5'>Efficiency</b>
            <p className='mt-3'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='border border-secondary rounded-3 p-5 abouthover' >
          <b className='fs-5'>Convenience</b>
          <p className='mt-3'>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='border border-secondary rounded-3 p-5 abouthover'>
          <b className='fs-5'>Personalization</b>
          <p className='mt-3'>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
     
     
    </>
  );
}

export default About;
