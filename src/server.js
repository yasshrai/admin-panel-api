import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connecttomongodb.js";
import adminRouter from "./routes/admin.routes.js";
import professorRouter from "./routes/professor.routes.js";
import studentRouter from "./routes/student.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://college-admin-panel.vercel.app", // Your frontend URL
    credentials: true, // Allow cookies to be sent and received
  })
);
app.use("/api/admin", adminRouter);
app.use("/api/students", studentRouter);
app.use("/api/professors", professorRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "school admin api" });
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
  connectToMongoDB();
});
