import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("Sign Up");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { token, backendUrl, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    // Check if a user is already logged in
    if (localStorage.getItem("token")) {
      toast.error("Please log out before registering or logging in as a new user.");
      return;
    }
  
    const endpoint = login === "Sign Up" ? "/api/user/register" : "/api/user/login";
    const payload =
      login === "Sign Up"
        ? { email: user.email, name: user.name, password: user.password }
        : { email: user.email, password: user.password };
  
    try {
      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (data.success) {
        if (login === "Sign Up") {
          setLogin("login");
          toast.success("Registered successfully, please log in");
        } else {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful");
          navigate("/");
        }
      } else {
        if (data.message === "User already exists. Please login") {
          setLogin("login"); // Switch to Login UI
          toast.error("User already exists, redirecting to login...");
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col m-auto gap-3 items-start p-8 border min-w-[340px] sm:min-w-96 rounded-xl border-zinc-200 shadow-lg text-sm">
          <p className="text-2xl font-semibold text-gray-600 ">
            {login === "Sign Up" ? "Craete account" : "LogIn"}{" "}
          </p>
          <p className="text-gray-500">
            Please {login === "Sign Up" ? "sign up" : "LogIn"} to book
            appointment
          </p>
          {login === "Sign Up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 p-2 mt-1 w-full rounded"
                type="text"
                name="name"
                onChange={handleChange}
                value={user.name}
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 p-2 mt-1 w-full rounded"
              type="email"
              name="email"
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 p-2 mt-1 w-full rounded"
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full rounded py-3 mt-3 text-base font-medium"
          >
            {login === "Sign Up" ? "Craete account" : "LogIn"}
          </button>

          {login === "Sign Up" ? (
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setLogin("login")}
                className="text-primary text-sm font-medium cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-600">
              Create an new account?{" "}
              <span
                onClick={() => setLogin("Sign Up")}
                className="text-primary text-sm font-medium cursor-pointer underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
