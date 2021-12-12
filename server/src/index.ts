import express from "express";
import { createServer } from "http";
import { Server as wsServer } from "socket.io";

const app = express();
const server = createServer(app);
const io = new wsServer(server);

io.on("connection", function(client) {
  console.log("Connected");

  client.on("message", (message) => {
    client.send(message);
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 6666;

server.listen(port, () => {
  console.log("server listening");
});
