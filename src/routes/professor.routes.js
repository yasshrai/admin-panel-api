import express from "express";
import {
  createProfessor,
  readProfessors,
  updateProfessor,
} from "../controller/professor.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createProfessor);
router.put("/update/:professorId", protectRoute, updateProfessor);
router.get("/getall", protectRoute, readProfessors);

export default router;
