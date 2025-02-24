import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality,docId}) => {

const {doctors} =useContext(AppContext)
const navigate = useNavigate()

const [reldoc, setRelDoc] = useState([])

useEffect(()=>{
    if (doctors.length>0 && speciality) {
        const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
        setRelDoc(doctorsData)
    }

},[doctors,speciality,docId])

  return (
    <>
       <div className='container text-center mt-5'>
      <h1 className='mb-4 text-primary text-medium'>Top Doctors To Book</h1>
      <p className='p-2 mb-5'>Simply browse through our extensive list of trusted doctors</p>
      <div className='d-flex flex-wrap justify-content-evenly gap-2'>
      
        {reldoc.slice(0,5).map((item,index)=>(
          <div  key={item._id || index} className='shadow mb-5' onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}}>
            <img src={item.image} alt="" style={{width:'250px'}} className='docslink' />
            <div>
            <div>
    <p className={`fs-5 fw-bold mt-3 ${item.available ? 'text-success' : 'text-danger'}`}>
        {item.available ? 'Available' : 'Not Available'}
    </p>
</div>
                <p className='fw-bold fs-5 text-secondary'>{item.name}</p>
                <p className='text-primary fw-bold'>{item.speciality}</p>
            </div>
          </div>
        ))}
        </div>
        <button className='btn rounded-pill p-1 fs-4 mb-5 btn1 ' onClick={()=>{navigate('/doctors');scrollTo(0,0)}} style={{width:'150px'}}>more</button>
      </div>
    </>
  );
}

export default RelatedDoctors;
