import express from "express";
import {
  addDoctor,
  allDoctors,
  appointmentCancel,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";
import { appointmentsAdmin } from "../controllers/adminController.js";
import { cancelAppointment } from "../controllers/userController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments",authAdmin, appointmentsAdmin)
adminRouter.post("/appointment-cancel",authAdmin, appointmentCancel)

export default adminRouter;
