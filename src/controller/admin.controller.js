import bcrypt from "bcryptjs";
import Admin from "../model/admin.model.js";
import generateTokenAndSetCookie from "../util/genratetoken.js";
// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!name || !username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      username,
      password: hashedPassword,
      email,
    });
    await newAdmin.save();
    return res.status(201).json(newAdmin);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to create admin" });
  }
};

// Admin login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(admin._id.toString(), res);
    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

// Admin logout
const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Logout successful" });
};

export { createAdmin, login, logout };
