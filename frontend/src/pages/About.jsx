import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <>
      <div className="mx-16 sm:mx-24 md:mx-28 lg:mx-32 overflow-x-hidden">
        <div className="text-center text-2xl text-gray-500 pt-10 ">
          <p>
            ABOUT <span className="text-gray-700 font-semibold ">US</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row my-10 gap-12">
          <img
            className="w-full max-w-[360px]"
            src={assets.about_image}
            alt=""
          />
          <div className="flex flex-col text-sm gap-6 justify-center md:w-2/4 text-gray-600 ">
            <p>
              Welcome to SickFix, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At SickFix, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>

            <p>
              SickFix is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, SickFix is here to support you every step
              of the way.
            </p>

            <b className="text-gray-800">Our Vision</b>
            <p>
              Our vision at SickFix is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>

        <div className="text-xl my-4">
          <p className="text-center">
            Why <span className="text-gray-700 font-semibold">Choose Us</span>{" "}
          </p>
        </div>
        <div className="flex flex-col md:flex-row text-gray-600 mb-20 mt-10">
          <div className="border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 hover:bg-primary hover:text-white transition-all duration-300">
            <b>Efficiency:</b>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 hover:bg-green-400 hover:text-white transition-all duration-300">
            <b> Convenience:</b>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 hover:bg-primary hover:text-white transition-all duration-300">
            <b> Personalization:</b>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
