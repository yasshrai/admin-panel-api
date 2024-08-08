import express from "express";
import {
  createAdmin,
  login,
  logout,
  changePassword,
  getAllAdmin,
  forgetPassword,
} from "../controller/admin.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", createAdmin);
router.post("/login", login);
router.post("/logout", protectRoute, logout); // Protected route
router.put("/changepassword", protectRoute, changePassword);
router.get("/getalladmin", protectRoute, getAllAdmin);
router.put("/forgetpassword", forgetPassword);

export default router;
