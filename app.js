const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

let room = ["room1", "room2", "room3"];

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let interval;

io.on("connection", (socket) => {
  socket.on("joinRoom", (name) => {
    console.log(name);
    io.emit("joinRoom", name);
  });

  socket.on("leaveRoom", (name) => {
    io.emit("leaveRoom", name);
  });

  socket.on("chat-msg", (name, msg) => {
    console.log(msg, name);
    io.emit("chat-msg", name, msg); // to(room[a])를 통해 그룹에게만 메세지를 날린다.
  });
});

server.listen(4000, () => console.log(`Listening on port 4000`));
