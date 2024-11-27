import React, { useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { toast } from "react-toastify";
import axios from "axios";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  experience: "1 Year",
  fees: "",
  about: "",
  speciality: "General physician",
  degree: "",
  address1: "",
  address2: "",
};

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const { aToken, backendUrl } = useContext(AdminContext);
  const [formData, setFormData] = useState(initialFormData);

  const speciality = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      // Create a new FormData object to send data as multipart/form-data
      const docDetails = new FormData();

      docDetails.append("image", docImg);

      // Combine address1 and address2 into a single "address" key
      const address = {
        line1: formData.address1,
        line2: formData.address2,
      };

      docDetails.append("address", JSON.stringify(address)); // Append the address as JSON

      // Loop through the formData object and append each key-value pair to FormData
      Object.keys(formData).forEach((key) => {
        if (key !== "address1" && key !== "address2") {
          docDetails.append(key, formData[key]); // Append all other fields
        }
      });

      // docDetails.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });

      // Sending the FormData to the backend with an API POST request
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor", // Backend URL to handle doctor creation
        docDetails, // FormData object containing all the doctor's details
        { headers: { Authorization: `Bearer ${aToken}` } } // Authorization header with the admin token
      );

      // Check if the backend response indicates a successful operation
      if (data.success) {
        toast.success(data.message);
        setDocImg(null); // Reset the image state
        setFormData(initialFormData); // Reset the form data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // If an error occurs during the API call or other issues, catch the error
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <p className="text-lg font-medium p-5 m-3">Add Doctor</p>
      <form className="m-5 w-full" onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded w-full border max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex items-center gap-4 mb-8 text-gray-500 ">
            <label htmlFor="doc-img">
              <img
                className="w-16 rounded-full cursor-pointer bg-blue-100"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              name=""
              id="doc-img"
              hidden
            />
            <p>
              Upload <br /> doctor's picture
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            {/* left */}
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1 px-8">
                <p>Doctor name</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  // required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1 px-8">
                <p>Doctor Email</p>
                <input
                  className="border rounded px-3 py-2"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1 px-8">
                <p>Doctor Password</p>
                <input
                  className="border rounded px-3 py-2"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1 px-8">
                <p>Experience</p>
                <select
                  className="border rounded px-3 py-2"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Year
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex flex-col gap-1 px-8">
                <p>Fees</p>
                <input
                  className="border rounded px-3 py-2"
                  type="number"
                  placeholder="Fees"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>
            {/* right */}
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1 px-8">
                <p>Speciality</p>
                <select
                  className="border rounded px-3 py-2"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                >
                  {speciality.map((speciality, index) => (
                    <option key={index} value={speciality}>
                      {speciality}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex flex-col gap-1 px-8">
                <p>Education</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Education"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1 px-8">
                <p>Address</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="address 1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  required
                />
                <input
                  className="border rounded px-3 py-2 mt-1"
                  type="text"
                  placeholder="address 2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="p-8">
            <p>About Doctor</p>
            <textarea
              className="w-full px-4 pt-2 border rounded mt-2"
              placeholder="write about doctor"
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <button
            className="bg-primary text-white rounded-full px-10 py-3 ml-8 hover:bg-green-400"
            type="submit"
          >
            Add doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
