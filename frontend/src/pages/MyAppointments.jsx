import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { Authorization: `Bearer ${token}` }, // Pass the auth token in headers
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass the auth token in headers
        }
      );
      if (data.success) {
        toast.success(data.message);
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, cancelled: true }
              : appointment
          )
        );
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            response,
            {
              headers: { Authorization: `Bearer ${token}` }, // Pass the auth token in headers
            }
          );
          if (data.success) {
            // // Update the UI instantly
            setAppointments((prevAppointments) =>
              prevAppointments.map((appointment) =>
                appointment._id === order.receipt
                  ? { ...appointment, payment: true }
                  : appointment
              )
            );

            // Fetch from the server to ensure consistency
            getUserAppointments();
            toast.success("Payment successful!");
            navigate("/my-appointments");
          }
        } catch (error) {
          console.error("Error verifying payment:", error); // Add this log
          toast.error("Payment verification failed.");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open(); // opens razorpay as pop-up
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass the auth token in headers
        }
      );

      if (data.success) {
        // Pass the appointment ID as the receipt to track it later
        console.log("data.order", data.order);
        initPay({ ...data.order, receipt: appointmentId });
        // initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="mx-16 sm:mx-24 md:mx-28 lg:mx-32 overflow-x-hidden">
      <p className="pb-3 mt-12 font-normal text-2xl text-zinc-700 border-b ">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b my-4"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 mt-2 font-medium">Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className="mt-2">
                <span className="font-medium text-zinc-700">Date & Time: </span>{" "}
                {item.slotDate}| {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col justify-end gap-4 text-sm text-stone-500 text-center">
              {item.isCompleted ? (
                <button className="border border-green-500 bg-green-100 text-green-700 rounded sm:min-w-48 py-2">
                  Appointment Completed
                </button>
              ) : item.cancelled ? (
                <button className="border border-red-500 text-red-500 rounded sm:min-w-48 py-2">
                  Appointment Cancelled
                </button>
              ) : (
                <>
                  {item.payment ? (
                    <button className="border py-2 sm:min-w-48 bg-green-500 text-white">
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="border py-2 sm:min-w-48 hover:bg-primary hover:text-white"
                    >
                      Pay Online
                    </button>
                  )}

                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="border py-2 sm:min-w-48 hover:bg-red-400 hover:text-white"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
