import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios'
import {toast} from 'react-toastify'
const MyProfile = () => {

  const{userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)

  const [isEdit,setIsEdit] = useState(false)
  const [image,setImage] = useState(false)

  const updateUserProfileData = async () => {
         
    try {
      
       const formData = new FormData()

       formData.append('name',userData.name)
       formData.append('phone',userData.phone)
       formData.append('address',JSON.stringify(userData.address))
       formData.append('gender',userData.gender)
       formData.append('dob',userData.dob)

       image && formData.append('image',image)

       const{data} = await axios.post(backendUrl + '/api/user/update-profile', formData,{headers:{token}})
       if (data.success) {
        toast.success(data.messsage)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
       }else{
        toast.error(data.message)
       }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }


  return userData && (

    <div className='container d-flex flex-column'>

    <div>
     
      {
        isEdit
        ? <label htmlFor='image'>
         <div>
        <img src={image ? URL.createObjectURL(image) :userData.image } alt="" className='w-50 rounded' />
        <img src={image ? '' : assets.upload_icon} alt="" className='bg-secondary w-50 rounded' style={{marginLeft:'-113px'}} />
         </div>
         <input onChange={(e) =>setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
        : <img src={userData.image} alt="" className='w-25 rounded mb-2' />
      }

      
 <div>
      {
        isEdit
        ? <input type="text" value={userData.name} onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))} className='mt-4 fs-2 ' />
        : <p className='fs-4 fw-bold mt-3'>{userData.name}</p>
      }
      <hr />
      </div>
      <div>
        <p className='fw-bold' style={{textDecoration:'underline'}}>CONTACT INFORMATION</p>
        <div>
          <p className='fw-bold '>Email id:</p>
          <p className='text-primary'>{userData.email}</p>
          <p className='fw-bold'>phone:</p>
          {
              isEdit
              ? <input type="text" value={userData.phone} onChange={e=>setUserData(prev=>({...prev,phone:e.target.value}))} />
              : <p className='text-primary'>{userData.phone}</p>
          }
          <p className='mt-2 fw-bold'>Address:</p>
          {
            isEdit
            ? (<p>
              <input onChange={(e) =>setUserData(prev=>({...prev, address:{...prev.address, line1:e.target.value}}))} value={userData.address?.line1 || ''} type='text' className='mb-3' />
              <br />
              <input  onChange={(e) =>setUserData(prev=>({...prev, address:{...prev.address, line2:e.target.value}}))} value={userData.address?.line2 || ''} type="text" />
            </p>)
            : (<p>
              {userData.address?.line1 || 'No address'}
              <br />
              {userData.address?.line2 || ''}
            </p>)
          }
        </div>
      </div>
      <div>
        <p className='fw-bold' style={{textDecoration:'underline'}}>BASIC INFORMATION</p>
        <div>
          <p className='fw-bold'>Gender:</p>
          {
        isEdit
        ? <select onChange={(e)=>setUserData(prev =>({...prev, gender: e.target.value}))} value={userData.gender} >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        : <p>{userData.gender}</p>
      }
      <p className='fw-bold'>Birthday:</p>
      {
        isEdit
         ?  <input type='date'  onChange={(e)=>setUserData(prev =>({...prev, dob: e.target.value}))} value={userData.dob}  />
         : <p>{userData.dob}</p> 
      }
        </div>
      </div>
      <div>
        {
          isEdit
          ?<button className='btn btn-secondary px-5 mt-4 py-2 rounded-5' onClick={updateUserProfileData} >Save information</button>
          :<button className='btn btn-secondary px-5 py-2 rounded-5 mt-2' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
      </div>
    </div>
  );
}

export default MyProfile;
