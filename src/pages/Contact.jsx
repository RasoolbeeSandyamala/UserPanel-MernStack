import React from 'react';
import { assets } from '../assets/assets';
import Container from 'react-bootstrap/Container';
const Contact = () => {
  return (
    <>
            <div >
          <p className='text-center fs-4'>CONTACT <span className='fw-bold'>US</span></p>
          </div>
      <div className='container d-flex gap-5 mt-5 mb-5 me-5 justify-content-center align-items-center flex-wrap '>
      
          
            <div>
            <img src={assets.contact_image} alt="" style={{width:'350px'}} />
            </div>
            <div>
                <p className='fs-5 fw-bold'>OUR OFFICE</p>
                <p>54709 Willms station <br /> Suite 350, Washington , USA</p>
                <p>Tel: (415) 555-0132 <br /> Email: rasoolbeebabaiah0786@gmail.com</p>
                <p className='fs-5 fw-bold'>Careers at PRESCRIPTO</p>
                <p>Learn More About Our Teams And Job Openings. </p>
                <button className='btn btn-dark'>Explore jobs</button>
            </div>
          </div>
          
        
    </>
  );
}

export default Contact;
