import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routers/auth.routes.js";
import messageRoutes from "./routers/messages.routes.js";
import userRoutes from "./routers/user.routes.js";
import { connectDB } from "./db/connectDB.js";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at http://localhost:${PORT}`);
  connectDB();
});
