import express from "express";
import {
  createProfessor,
  readProfessors,
  updateProfessor,
  uniqueProfessorId,
} from "../controller/professor.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createProfessor);
router.put("/update/:professorId", protectRoute, updateProfessor);
router.get("/getall", protectRoute, readProfessors);
router.get("/get/uniqueprofessorid", protectRoute, uniqueProfessorId);

export default router;
