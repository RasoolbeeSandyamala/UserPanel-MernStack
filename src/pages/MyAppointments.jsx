import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import {toast} from 'react-toastify'
const MyAppointments = () => {

  const {backendUrl,token,getDoctorsData} = useContext(AppContext)

  const[appointments,setAppointments] = useState([])
  const months =["","Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split('-')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }
  const getUserAppointments = async () =>{

    try {

      const {data} = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}})
      
      if (data.success) {
        setAppointments(data.appointments.reverse())
        // console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId)=>{

    try {

      // console.log(appointmentId);
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  } 
  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])
  return (
    <div className='container'>
      <p className='fs-3 fw-bold'>My appointments</p>
      <hr />
      <div>
        {appointments.map((item,index)=>(
          <div key={index} className='d-flex justify-content-center align-items-center mt-5'>
           <div >
            <img src={item.docData.image} alt="" className='w-75 rounded' style={{backgroundColor:'#5f6fff'}} />
           </div>
            <div>
              <p className='fw-bold fs-5'>{item.docData.name}</p>
              <p className='text-secondary'>{item.docData.speciality}</p>
              <p className='fw-bold'>Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p><span className='fw-bold'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            
              <div></div>
            <div className='d-flex flex-column'>
            {!item.cancelled && !item.isCompleted && <button onClick={() => alert("Payment functionality is not available in this project.")}     className='btn btn-primary opacity-75 mb-4 ms-3'>Pay Online</button> }  
             {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='btn btn-danger ms-3'>Cancel appointment</button>}
             {item.cancelled && !item.isCompleted && <button className='btn border border-2 text-danger ms-2 border-danger ms-3'>Appointment cancelled</button>}
             {item.isCompleted && <button className='btn-success btn ms-3 px-4 '> completed </button>}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
