import express from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./routers/routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();

// CORS middleware
app.use(
  cors({
    origin: [
      "https://codex-realtime-app.netlify.app",
      "https://66545cf7620e7f84784d8fbe--codex-realtime-app.netlify.app/",
    ], // Add both URLs
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://codex-realtime-app.netlify.app",
      "https://664bc92bda79e83a8db96297--codex-realtime-app.netlify.app",
    ],
    methods: ["GET", "POST"],
  },
});

let usersCount = 0;

io.on("connection", (socket) => {
  usersCount++;
  console.log(`A user connected. Total users: ${usersCount}`);

  // Assign roles based on the number of connected users
  const isMentor = usersCount === 1;

  // Notify the newly connected user of their status
  socket.emit("user status", isMentor ? "mentor" : "student");

  socket.on("disconnect", () => {
    usersCount--;
    console.log("user disconnected");
  });

  // Notify all connected clients of the current status
  io.emit("user status update", {
    totalUsers: usersCount,
    roles: usersCount > 1 ? "student" : "mentor",
  });

  socket.on("text change", (msg) => {
    socket.broadcast.emit("recieve change", msg);
  });
});

app.use("/", routes);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
