import express from "express";
import {
  createStudent,
  updateStudent,
  readStudents,
} from "../controller/student.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", createStudent);
router.put("/update/:scholarNumber", updateStudent);
router.get("/getall", readStudents);

export default router;
