import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../Components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const { docId } = useParams();
  const navigate = useNavigate();

  // Find the doctor with the matching ID
  const docInfo = doctors.find((doc) => doc._id === docId);
  let timeSlots = [];

  const getAvailableSlots = () => {
    let today = new Date();
    timeSlots = []; // Reset timeSlots to ensure fresh data

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endtime = new Date(currentDate);
      endtime.setHours(18, 0);

      if (today.getDate() === currentDate.getDate()) {
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();

        // Set the hour and minutes with ternary logic
        currentDate.setHours(
          currentHours < 10
            ? 10
            : currentMinutes < 30
            ? currentHours
            : currentHours + 1
        );
        currentDate.setMinutes(currentMinutes < 30 ? 30 : 0);
      } else {
        // Set to the default time for other days
        currentDate.setHours(10, 0);
      }

      let dailySlots = []; // Array to store slots for the current day

      while (currentDate < endtime) {
        // Display time in 12-hour format with AM/PM
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const isSlotBooked =
          docInfo?.slots_booked?.[slotDate]?.includes(formattedTime);

        // Add the time slot for the current day
        dailySlots.push({
          time: formattedTime,
          isBooked: isSlotBooked, // Mark the slot as booked or available
        });

        // Move the current date forward by 30 minutes for the next slot
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      // Push the object with date and time slots for this day
      timeSlots.push({
        date: currentDate,
        slots: dailySlots,
      });
    }
    setDocSlots(timeSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book Appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex].date;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass the auth token in headers
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="mx-16 sm:mx-24 md:mx-28 lg:mx-32 mt-5 overflow-x-hidden">
        <div className="flex flex-col md:flex-row gap-4">
          {/* doctor image */}
          <div className="w-full md:w-1/4">
            <img
              className="bg-primary sm:max-w-72 rounded-lg w-full"
              src={docInfo.image}
              alt=""
            />
          </div>

          {/* doctor's info */}
          <div className="w-full md:w-3/4">
            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 sm:mx-0 mt-6 md:mt-0">
              <p className="flex items-center gap-2 text-gray-900 text-2xl font-medium">
                {docInfo.name}
                <img className="w-5" src={assets.verified_icon} alt="" />
              </p>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="border rounded-full py-0.5 px-2 text-xs ">
                  {docInfo.experience}
                </button>
              </div>
              <div>
                <p className="text-gray-900 text-lg mt-3 font-medium">About</p>
                <p className="text-gray-600 text-sm max-w-[700px] mt-1">
                  {docInfo.about}
                </p>
              </div>
              <p className="text-gray-500 mt-4 font-medium">
                Appointment fee:
                <span className="text-gray-700">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>

            {/* Booking Slots */}
            <div className="mt-5">
              <p className="text-2xl font-medium text-gray-800">
                Booking slots
              </p>
              {/* weekday slots */}
              <div className="flex flex-row gap-4 mt-3 overflow-x-auto">
                {docSlots.map((item, index) => (
                  <div key={index}>
                    <div
                      onClick={() => setSlotIndex(index)}
                      className={`border rounded p-4 w-16 cursor-pointer my-6 ${
                        slotIndex === index ? "bg-primary text-white" : ""
                      }`}
                    >
                      <p>
                        {item.date.toLocaleString("default", {
                          weekday: "short",
                        })}
                      </p>
                      <p>{item.date.getDate()}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* time slots */}
              {docSlots[slotIndex]?.slots?.length > 0 ? (
                <div className="flex flex-row gap-3 overflow-x-auto">
                  {docSlots[slotIndex].slots.map((slot, idx) => (
                    <div
                      key={idx}
                      onClick={() => !slot.isBooked && setSlotTime(slot.time)} // Prevent selection of booked slots
                      className={`p-5 border w-28 whitespace-nowrap rounded-3xl cursor-pointer ${
                        slot.isBooked
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed" // Gray out booked slots
                          : slot.time === slotTime
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      // onClick={() => setSlotTime(slot.time)}
                      // className={`p-5 border w-28 whitespace-nowrap rounded-3xl cursor-pointer ${
                      //   slot.time === slotTime ? "bg-primary text-white" : ""
                      // }`}
                    >
                      <p>{slot.time}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <h1>
                  No slots are available for today. Please book starting from
                  tomorrow.
                </h1>
              )}

              <button
                onClick={bookAppointment}
                className="bg-primary text-white rounded-full mt-8 text-sm font-medium px-14 py-3 hover:bg-green-400 hover:font-semibold"
              >
                Book an appointment
              </button>
            </div>

            {/* Listing Related Doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
