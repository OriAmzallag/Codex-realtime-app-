import express from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./routers/routes.js";
import cors from "cors";

const app = express();

// CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // Allowing CORS from port 3000
    origin: "https://codex-realtime-app.netlify.app",
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
