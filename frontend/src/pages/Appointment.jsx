import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../Components/RelatedDoctors";

const Appointment = () => {
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const { doctors, currencySymbol } = useContext(AppContext);
  const { docId } = useParams();

  // Find the doctor with the matching ID
  const docInfo = doctors.find((doc) => doc._id === docId);
  let timeSlots = [];

  const getAvailableSlots = () => {
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endtime = new Date(currentDate);
      endtime.setHours(18, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() <= 10 ? 10 : currentDate.getHours() + 1
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 0 : 30);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let dailySlots = []; // Array to store slots for the current day

      while (currentDate < endtime) {
        let formattedTime = currentDate.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Add the time slot for the current day
        dailySlots.push({
          time: formattedTime,
        });

        // Move the current date forward by 30 minutes for the next slot
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      // Push the object with date and time slots for this day
      timeSlots.push({
        date: currentDate, // Format the date as a string
        slots: dailySlots,
      });
    }
    setDocSlots(timeSlots);
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // useEffect(() => {
  //   console.log("slots", docSlots);
  // }, [docSlots]);

  return (
    docInfo && (
      <div className="mx-32">
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 sm:mx-0 sm:mt-0 mt-[-80px]">
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

            <div>
              <p className="text-lg font-medium text-gray-800">Booking slots</p>
              <div className="flex flex-row gap-4 mt-3">
                {docSlots.map((item, index) => (
                  <div key={index}>
                    <div
                      onClick={() => setSlotIndex(index)}
                      className={`border rounded p-4 w-16 cursor-pointer my-6 ${slotIndex === index ? "bg-primary text-white" : ""
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
              {docSlots[slotIndex]?.slots?.length > 0 && (
                <div className="flex flex-row gap-3 max-w-[800px] overflow-x-auto ">
                  {docSlots[slotIndex].slots.map((slot, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSlotTime(slot.time)}
                      className={`p-5 border rounded-lg cursor-pointer ${slot.time === slotTime ? "bg-primary text-white" : ""
                        }`}
                    >
                      <p>{slot.time}</p>
                    </div>
                  ))}
                </div>
              )}

              <button className="bg-primary text-white rounded-full mt-8 text-sm font-medium px-14 py-3 hover:bg-green-400 hover:font-semibold">
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
