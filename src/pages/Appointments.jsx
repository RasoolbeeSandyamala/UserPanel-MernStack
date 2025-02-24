import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, getDoctorsData, backendUrl, token } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    let doc = doctors.find((doc) => doc._id === docId);

    if (!doc) {
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctors/${docId}`);
        if (data.success) {
          doc = data.doctor;
        }
      } catch (error) {
        console.log("Error fetching doctor info:", error);
      }
    }

    setDocInfo(doc);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;

    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo?.slots_booked?.[slotDate]
            ? !docInfo.slots_booked[slotDate].includes(slotTime)
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0]?.datetime;

      if (!date) {
        toast.error('No available slots.');
        return;
      }

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return docInfo && (
    <div className="container mt-4">
      <div className="row align-items-start">
        <div className="col-lg-3 col-md-6 text-center">
          <img
            src={docInfo.image}
            alt="Doctor"
            className="img-fluid rounded shadow-lg mb-4"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '420px', backgroundColor: '#5f6fff' }}
          />
        </div>
        <div className="col-lg-9 col-md-6">
          <div className="border border-secondary rounded shadow px-4">
            <h3 className="fw-bold d-flex align-items-center gap-2 mt-1">
              {docInfo.name}
              <img src={assets.verified_icon} alt="Verified" className="img-fluid" style={{ width: '24px' }} />
            </h3>
            <p className="text-muted">{docInfo.degree} - {docInfo.speciality}</p>
            <button className="btn btn-outline-primary mb-3">{docInfo.experience} years experience</button>
            <h4 className="d-flex align-items-center gap-2">
              About <img src={assets.info_icon} alt="Info" style={{ width: '20px' }} />
            </h4>
            <p className="text-secondary">{docInfo.about}</p>
            <p className="fs-5 fw-bold">Appointment fee: <span className="text-primary">{currencySymbol}{docInfo.fees}</span></p>
          </div>
        </div>
      </div>

      <div className="mt-5 ms-2">
        <h4 className="fw-bold fs-3 mb-5 ms-2">Booking Slots</h4>
        <div className="d-flex flex-wrap gap-3 mt-3">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center p-2 px-3 rounded cursor-pointer shadow ${slotIndex === index ? 'bg-primary text-white' : 'border border-secondary'}`}
              style={{ cursor: 'pointer' }}
            >
              <p className="mb-0">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className="mb-0">{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap mt-3">
          {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm px-3 py-1 rounded cursor-pointer ${item.time === slotTime ? 'bg-primary text-light' : 'border border-secondary text-secondary'}`}
              style={{ cursor: 'pointer' }}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button onClick={bookAppointment} className="btn btn-primary mt-4 w-100">Book an Appointment</button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointments;
