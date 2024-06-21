import express from "express";
import {
  createAdmin,
  login,
  logout,
  changePassword,
} from "../controller/admin.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", createAdmin); // Protected route
router.post("/login", login);
router.post("/logout", logout); // Protected route
router.put("/changepassword", changePassword);

export default router;
