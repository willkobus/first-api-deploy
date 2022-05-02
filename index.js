const express = require("express");
const cors = require("cors");


require('dotenv').config();
const server = express(); // this server is deaf AF. Can't hear ANYTHING.

//DB imports


const {studentsRouter} = require("./Routes/students")
const {destinationsRouter} = require("./Routes/destinations")

// Tell server how to process different payloads
server.use(cors());

server.use("/students", studentsRouter)
server.use("/destinations", destinationsRouter)


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server Listening...");
});

server.get("/", (req, res) => {
  res.send("<h1>This is the landing page</h1>");
});


