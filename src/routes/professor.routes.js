import express from "express";
import {
  createProfessor,
  readProfessors,
  updateProfessor,
} from "../controller/professor.controller.js";

const router = express.Router();

router.post("/create", createProfessor);
router.put("/update/:professorId", updateProfessor);
router.get("/getall", readProfessors);

export default router;
