import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

app.use("/api/messages", messageRoutes);

app.use(errorHandler);

export default app;