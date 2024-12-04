import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  // State to toggle between "Admin" and "Doctor" login
  const [state, setState] = useState("Admin");

  // Form data for email and password inputs
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Context values for setting authentication token and backend URL
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  // Handles input field changes and updates formData state dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      // Determines the API endpoint and token storage key based on the current state
      const isAdmin = state === "Admin";
      const endpoint = isAdmin ? "/api/admin/login" : "/api/doctor/login";
      const tokenKey = isAdmin ? "aToken" : "dToken";
      const setToken = isAdmin ? setAToken : setDToken;
  
      // Sends a POST request to the appropriate login endpoint
      const { data } = await axios.post(`${backendUrl}${endpoint}`, formData);
  
      if (data.success) {
        console.log("token", data.token);
        localStorage.setItem(tokenKey, data.token);
        setToken(data.token); // Updates context with the token
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl m-auto font-semibold">
          <span className="text-primary">{state}</span>Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            className="border border-[#DADADA] rounded mt-1 p-2 w-full"
            type="email"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            className="border border-[#DADADA] rounded mt-1 p-2 w-full"
            type="password"
          />
        </div>
        <button
          className="bg-primary text-white w-full text-base py-2 rounded-md"
          type="submit"
        >
          Login
        </button>

        <p>
          {state === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
          <span
            className="text-primary cursor-pointer underline"
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
