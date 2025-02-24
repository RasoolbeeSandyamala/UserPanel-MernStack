import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  // console.log(speciality)
  const [filterDoc, setFilterDoc] = useState([]); // Initialized as an empty array
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(doctors);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      if (speciality) {
        const filtered = doctors.filter(
          (doc) => doc.speciality.toLowerCase().trim() === speciality.toLowerCase().trim()
        );
        console.log("Filtered Doctors:", filtered);
        setFilterDoc(filtered);
      } else {
        setFilterDoc(doctors);
      }
    }
  }, [doctors, speciality]);


  return (
    <>
      <div>
        <p className='conatiner mt-2 ms-5 mt-5 text-secondary'>Browse through the doctors' specialists.</p>
        <div className='container d-flex  justify-content-between gap-5 mt-5 mb-5 '>
          <div >
            <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className='pactive  border border-3 p-2 rounded-2 mt-2'>General Physician</p>
            <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className='pactive border border-3 p-2 rounded-2'>Gynecologist</p>
            <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className=' pactive  border border-3 p-2 rounded-2'>Dermatologist</p>
            <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className=' pactive  border border-3 p-2 rounded-2'>Pediatricians</p>
            <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className=' pactive  border border-3 p-2 rounded-2'>Neurologist</p>
            <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className=' pactive border border-3 p-2 rounded-2'>Gastroenterologist</p>
          </div>
          <div className='container d-flex justify-content-evently gap-2 p-2 flex-wrap'>

            {filterDoc.map((item, index) => (
              <div
                key={item._id || index}
                className=" mb-3  p-2 ms-5 border border-2 rounded-3 shadow"
                onClick={() => navigate(`/appointment/${item._id}`)}
              >
                <img src={item.image} alt={item.name} style={{ width: '250px', cursor: 'pointer' }} className="docslink" />
                <div>
                  <div>
                    <p className={`fs-5 fw-bold mt-3 ${item.available ? 'text-success' : 'text-danger'}`}>
                      {item.available ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                  <p className="fw-bold fs-5 text-secondary ms-3">{item.name}</p>
                  <p className="text-primary fw-bold ms-3">{item.speciality}</p>
                </div>
              </div>
            ))}



          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
