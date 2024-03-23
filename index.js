import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Database/db config.js";
import router from "./Routers/index.js";



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
ConnectDB();
app.use("/api", router);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
