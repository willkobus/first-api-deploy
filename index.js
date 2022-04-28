const express = require("express");

const server = express(); // this server is deaf AF. Can't hear ANYTHING.

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server Listening...");
});

server.get("/", (req, res) => {
  res.send("<h1>This is the landing page</h1>");
});

server.get("/will", (req, res) => {
  res.send("<h1>Hi Will Is the coolest</h1>");
});
