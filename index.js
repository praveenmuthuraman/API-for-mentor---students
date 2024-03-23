import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Database/db config.js";
import mentorRouter from "./Routers/MentorRouter.js";
import studentRouter from "./Routers/StudentRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
ConnectDB();
app.use("/api/mentors", mentorRouter); 
app.use("/api/students", studentRouter); 
const port = process.env.PORT 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
