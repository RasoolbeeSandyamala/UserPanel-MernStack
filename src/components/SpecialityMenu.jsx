import React from 'react';
import { specialityData } from '../assets/assets';
import Nav from 'react-bootstrap/Nav';
const SpecialityMenu = () => {
  return (
    <div className='container text-center'id='speciality'>
     <div  className='mt-3 d-flex flex-column gap-3 mb-4'>
       <h1 className='text-primary mt-2 p-3'>Find By Speciality</h1>
       <p className='mb-4'>Simply browse through our extensive list of trusted doctors,<br></br> schedule your appointment hassle-free. </p>
      </div>
      <div className='d-flex justify-content-center align-items-center container flex-wrap gap-5'>
        {specialityData.map((item,index)=>(
        <Nav.Link className='doclink' key={index} href = {`/doctors/ ${item.speciality}`} onClick={()=>scrollTo(0,0)}>
         <img src={item.image} alt=""  style={{width:'80px', marginBottom:'20px'}}/>
         <p>{item.speciality}</p>
        </Nav.Link>
        ))}
      </div>
    </div>
   
  );
}

export default SpecialityMenu;
