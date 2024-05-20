import express from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./routers/routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // Allowing CORS from port 3000
    origin: "http://localhost:3000",
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
const port = 3001;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
