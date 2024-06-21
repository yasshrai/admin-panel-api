import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createProfessor,
  readProfessors,
  updateProfessor,
} from "../controller/professor.controller.js";

const router = express.Router();

router.post("/create", createProfessor);
router.put("/update/:professorId", protectRoute, updateProfessor);
router.get("/getall", protectRoute, readProfessors);

export default router;
