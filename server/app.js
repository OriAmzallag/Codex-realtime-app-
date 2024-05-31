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
      process.env.CLIENT_URL,
      "https://66545cf7620e7f84784d8fbe--codex-realtime-app.netlify.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL,
      "https://664bc92bda79e83a8db96297--codex-realtime-app.netlify.app",
    ],
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log(`A user connected. Socket ID: ${socket.id}`);

  socket.on("join room", (room) => {
    console.log(socket.id + ` joined the ${room} room`);

    if (!rooms.has(room)) {
      rooms.set(room, []);
    }

    const usersInRoom = rooms.get(room);
    usersInRoom.push(socket.id);
    rooms.set(room, usersInRoom);

    socket.join(room);

    // Assign roles based on the number of users in the room
    const isMentor = usersInRoom.length === 1;
    const role = isMentor ? "mentor" : "student";

    // Notify the new connected user of their status
    socket.emit("user status", role);

    // Notify all connected users of their current status
    io.to(room).emit("user status update", {
      totalUsers: usersInRoom.length,
      role,
    });
  });

  socket.on("text change", (msg, caseRoom) => {
    socket.to(caseRoom).emit("recieve change", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    for (const [room, usersInRoom] of rooms.entries()) {
      const index = usersInRoom.indexOf(socket.id);
      if (index !== -1) {
        usersInRoom.splice(index, 1);
        if (usersInRoom.length === 0) {
          rooms.delete(room);
        } else {
          rooms.set(room, usersInRoom);
          // Reassign mentor if the mentor leaves
          if (index === 0) {
            const newMentorId = usersInRoom[0];
            io.to(newMentorId).emit("user status", "mentor");
            io.to(room).emit("user status update", {
              totalUsers: usersInRoom.length,
              role: "mentor reassigned",
            });
          }
        }
        break;
      }
    }
  });
});

app.use("/", routes);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
