import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false); // Local state to manage edit mode
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext); // Destructure required values from the global contex

  // const [userData, setUserData] = useState({
  //   name: "Edward Vincent",
  //   image: assets.profile_pic,
  //   email: "richardjameswap@gmail.com",
  //   phone: "+1  123 456 7890",
  //   address: "57th Cross, Richmond Circle Church Road, London",
  //   gender: "Male",
  //   dob: "2000-10-24",
  // });
  // const { name, image, email, phone, address, gender, dob } = userData;

  const [image, setImage] = useState(false); // Local state to manage image being uploaded

  // Function to handle updating the user's profile data
  const updateUserProfileData = async () => {
    try {
      const formdata = new FormData(); // FormData is used to handle file uploads

      //  Append all user data to the formData object
      //  Iterate over userData keys to append them dynamically
      Object.entries(userData).forEach(([key, value]) => {
        // Convert the address object to a string before appending
        formdata.append(key, key === "address" ? JSON.stringify(value) : value);
      });

      // Append image only if it exists
      image && formdata.append("image", image);

      // Send the data to the backend API
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formdata,
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass the auth token in headers
        }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData(); // Refresh user data by calling the loadUserProfileData function
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  /**
   * Function to handle changes in input fields
   * Updates the userData state locally before saving
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input is a radio button, update the value if it's checked
    if (type === "radio" && checked) {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type !== "radio") {
      if (name.startsWith("address.")) {
        // Handle nested fields like address.line1 and address.line2
        const field = name.split(".")[1];
        setUserData((prev) => ({
          ...prev,
          address: { ...prev.address, [field]: value },
        }));
      } else {
        // For other input types (text, date, etc.), directly update the value
        setUserData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };
console.log("first", userData)
  return (
    userData && (
      <div className="ml-20 sm:mx-24 md:mx-28 lg:mx-32 overflow-x-hidden mt-10">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer ">
              <img
                src={image ? URL.createObjectURL(image) : userData.image} //image preview
                alt=""
                className="w-36 rounded opacity-75"
              />
              <img
                src={image ? "" : assets.upload_icon}
                alt=""
                className="w-10 absolute bottom-12 right-12"
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-blue-100 border border-gray-200 rounded p-2 text-lg font-medium mt-8 max-w-64 mb-4"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            autoFocus // Only applies focus when entering edit mode
            placeholder="enter the name"
          />
        ) : (
          <p className="text-3xl mt-8 text-neutral-800 font-medium mb-4">
            {userData.name}
          </p>
        )}
        <hr className="border-none bg-stone-300 h-[1px] w-1/3" />

        <p className="underline text-neutral-500 my-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_8fr] gap-y-3 mt-3 text-neutral-700">
          <p className="font-medium">Email id: </p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone: </p>
          {isEdit ? (
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="enter phone number"
              className="bg-blue-100 border border-gray-200 rounded p-1 font-normal max-w-64 mb-2"
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address: </p>
          {isEdit ? (
            <p>
              <input
                type="text"
                name="address.line1" // Name reflects nested field
                value={userData.address.line1}
                onChange={handleInputChange}
                placeholder="Enter address line 1"
                className="bg-blue-100 border border-gray-200 rounded p-1 font-normal max-w-96 mb-2"
              />
              <br />
              <input
                type="text"
                name="address.line2" // Name reflects nested field
                value={userData.address.line2}
                onChange={handleInputChange}
                placeholder="Enter address line 2"
                className="bg-blue-100 border border-gray-200 rounded p-1 font-normal max-w-96 mb-2"
              />
            </p>
          ) : (
            <p className="text-gray-500 w-[200px]">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
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
                  checked={userData.gender === "Female"}
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
                  checked={userData.gender === "Male"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Male
              </label>
            </div>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="font-medium">Birthday: </p>
          {isEdit ? (
            <input
              type="date"
              name="dob"
              value={userData.dob}
              placeholder="dd-mm-yy"
              onChange={handleInputChange}
              className="bg-blue-100 border border-gray-200 rounded p-1 font-normal max-w-36 mb-2"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>

        <button
          className="border border-primary px-8 py-4 hover:bg-primary hover:text-white rounded-full mt-10 font-medium"
          // onClick={() => setIsEdit((prev) => !prev)}
          onClick={() => {
            if (isEdit) {
              updateUserProfileData(); // Call the update function if in edit mode
            }
            setIsEdit((prev) => !prev); // Toggle edit mode
          }}
        >
          {isEdit ? "Save information" : "Edit"}
        </button>
      </div>
    )
  );
};

export default MyProfile;
