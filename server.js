const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  console.log("a user connected");
  socket.broadcast.emit("chat message", "a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit("chat message", "a user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
