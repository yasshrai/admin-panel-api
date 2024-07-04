import express from "express";
import {
  createStudent,
  updateStudent,
  readStudents,
  filterStudents,
} from "../controller/student.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createStudent);
router.put("/update/:scholarNumber", protectRoute, updateStudent);
router.get("/getall", protectRoute, readStudents);
router.post("/get/filter", protectRoute, filterStudents);

export default router;
