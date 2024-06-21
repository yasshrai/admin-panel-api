import bcrypt from "bcryptjs";
import Admin from "../model/admin.model.js";
import generateTokenAndSetCookie from "../util/genratetoken.js";
// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!name || !username || !password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      username,
      password: hashedPassword,
      email,
    });
    await newAdmin.save();
    return res.status(201).json({
      _id: newAdmin._id,
      name: newAdmin.name,
      username: newAdmin.username,
      email: newAdmin.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unable to create admin" });
  }
};

// Admin login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    generateTokenAndSetCookie(admin._id.toString(), res);
    return res.status(200).json({
      _id: admin._id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
    });
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};

// Admin logout
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  const username = req.body.username;
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;

  try {
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export { createAdmin, login, logout, changePassword };
