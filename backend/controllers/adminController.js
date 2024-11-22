import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModels.js";
import jwt from 'jsonwebtoken'

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      speciality,
      degree,
      fees,
      about,
      experience,
    } = req.body;
    const imageFile = req.file.path;
    // console.log(imageFile, {name, email, password, address, speciality, degree, fees, availability, experience } )

    // checking for all the data fields to add the doctor
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !speciality ||
      !degree ||
      !fees ||
      !experience ||
      !about
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating the email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // data format for the doctor
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      address: address,
      date: Date.now(),
      speciality,
      experience,
      degree,
      fees,
      about,
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      res.json({ success: true, token}) 
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin };
