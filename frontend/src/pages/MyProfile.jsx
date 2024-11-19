import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1  123 456 7890",
    address: "57th Cross, Richmond Circle Church Road, London",
    gender: "Male",
    dob: "2000-10-24",
  });

  const { name, image, email, phone, address, gender, dob } = userData;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input is a radio button, update the value if it's checked
    if (type === "radio" && checked) {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type !== "radio") {
      // For other input types (text, date, etc.), directly update the value
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="ml-20 sm:mx-24 md:mx-28 lg:mx-32 overflow-x-hidden mt-10">
      <img className="w-36 rounded" src={image} alt="" />
      {isEdit ? (
        <input
          className="bg-blue-100 border border-gray-200 rounded p-2 text-lg font-medium mt-8 max-w-64 mb-4"
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          autoFocus // Only applies focus when entering edit mode
          placeholder="enter the name"
        />
      ) : (
        <p className="text-3xl mt-8 text-neutral-800 font-medium mb-4">
          {name}
        </p>
      )}
      <hr className="border-none bg-stone-300 h-[1px] w-1/3" />

      <p className="underline text-neutral-500 my-3">CONTACT INFORMATION</p>
      <div className="grid grid-cols-[1fr_8fr] gap-y-3 mt-3 text-neutral-700">
        <p className="font-medium">Email id: </p>
        <p className="text-blue-500">{email}</p>

        <p className="font-medium">Phone: </p>
        {isEdit ? (
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleInputChange}
            placeholder="enter phone number"
            className="bg-blue-100 border border-gray-200 rounded p-1 font-normal max-w-64 mb-2"
          />
        ) : (
          <p className="text-blue-400">{phone}</p>
        )}

        <p className="font-medium">Address: </p>
        {isEdit ? (
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleInputChange}
            placeholder="enter address"
            className="bg-blue-100 border border-gray-200 rounded p-1 font-normal max-w-96 mb-2"
          />
        ) : (
          <p className="text-gray-500 w-[200px]">{address}</p>
        )}
      </div>

      <p className="underline text-neutral-500 mt-10">BASIC INFORMATION</p>
      <div className="grid grid-cols-[1fr_8fr] gap-y-3 mt-3 text-neutral-700">
        <p className="font-medium">Gender: </p>
        {isEdit ? (
          <div className="flex gap-10">
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Male
            </label>
          </div>
        ) : (
          <p>{gender}</p>
        )}

        <p className="font-medium">Birthday: </p>
        {isEdit ? (
          <input
            type="date"
            name="dob"
            value={dob}
            placeholder="dd-mm-yy"
            onChange={handleInputChange}
            className="bg-blue-100 border border-gray-200 rounded p-1 font-normal max-w-36 mb-2"
          />
        ) : (
          <p>{dob}</p>
        )}
      </div>

      <button
        className="border border-primary px-8 py-4 hover:bg-primary hover:text-white rounded-full mt-10 font-medium"
        onClick={() => setIsEdit((prev) => !prev)}
      >
        {isEdit ? "Save information" : "Edit"}
      </button>
    </div>
  );
};

export default MyProfile;
