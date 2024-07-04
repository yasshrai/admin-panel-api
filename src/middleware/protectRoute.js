import jwt from "jsonwebtoken";
import Admin from "../model/admin.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwtkey;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized - Token Expired" });
      } else {
        return res.status(401).json({ error: "Unauthorized - Invalid Token" });
      }
    }

    const admin = await Admin.findById(decoded.userId).select("-password");

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    req.user = admin;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
