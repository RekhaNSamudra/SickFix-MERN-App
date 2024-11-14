import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <>
      <div className="mx-32">
        <div className="text-center text-2xl text-gray-500 pt-10">
          <p>
            CONTACT <span className="text-gray-700 font-semibold ">US</span>
          </p>
        </div>
        <div className="flex flex-col justify-center my-10 md:flex-row gap-10 mb-28 text-sm">
          <img
            className="w-full max-w-[360px]"
            src={assets.contact_image}
            alt=""
          />
          <div className="flex flex-col justify-center items-start  gap-6">
            <p className="text-gray-600 text-lg font-semibold">Our OFFICE</p>
            <p className="text-gray-500">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <p className="text-gray-500">
              Tel: (415) 555‑0132 <br /> Email: sickfix@gmail.com{" "}
            </p>
            <p className="text-gray-600 text-lg font-semibold">
              Careers at SICKFIX{" "}
            </p>
            <p className="text-gray-500">
              {" "}
              Learn more about our teams and job openings.
            </p>
            <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
              {" "}
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
