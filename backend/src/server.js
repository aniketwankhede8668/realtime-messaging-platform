import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { socketHandler } from "./websocket/socketHandler.js";
import "./workers/messageWorker.js";

app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  },
  maxHttpBufferSize: 1e8
});

connectDB();

socketHandler(io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});