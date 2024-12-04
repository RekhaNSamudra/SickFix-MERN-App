import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  doctorAppointments,
  doctorDashboard,
  doctorsList,
  loginDoctor,
} from "../controllers/doctorController.js";
import { authDoctor } from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorsList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, doctorAppointments);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

export default doctorRouter;
