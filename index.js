const express = require("express");

const server = express(); // this server is deaf AF. Can't hear ANYTHING.

// Tell server how to process different payloads
server.use(express.json());

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server Listening...");
});

//CRUD
// Create => POST
// Read => GET
// Update => PUT
// Delete => DELETE

const destinations = [];

const students = {
  dao: {
    name: "Dao",
    interest: ["tacos"],
    city: "Sac Town",
  },
  nikko: {
    name: "Nikko",
    interest: ["bananas"],
    city: "Detroit",
  },
  will: {
    name: "Will",
    interest: ["camaro", "frontier", "wrangler", "bananas"],
    city: "Detroit",
  },
  jose: {
    name: "jose",
    interest: ["tacos"],
    city: "Miami",
  },
};

server.get("/students", (req, res) => {
  // make variables using query params
  const { name, interest, city } = req.query;
  // check to make sure a name is passed in
  if (name) {
    // make a variable to hold student data based on name passed
    const student = students[name.toLowerCase()];
    // check to see if student is in DB
    if (student) {
      // send student object as response
      return res.send(student);
    }
    // send error if student is not in DB
    return res
      .status(404)
      .send({ error: `Student by name of ${name.toUpperCase()} not found` });
  }
  //creates an array of the entries in the students object
  let filteredStudents = Object.values(students);
  // checks to see if a student in students contains the interest passed in, if an interest is used as query param
  if (interest) {
    filteredStudents = filteredStudents.filter((student) =>
      student.interest.includes(interest.toLowerCase())
    );
  }
  // checks to see if a student in students contains the city passed in, if acity is used as query param
  if (city) {
    filteredStudents = filteredStudents.filter(
      (student) => student.city.toLowerCase() === city.toLowerCase()
    );
  }
  //returns the students who match the query parameters passed in (name, interest,)
  return res.send(filteredStudents);
});

server.get("/students/city/:city", (req, res) => {
  const { city } = req.params;
  if (city) {
    return res.send(
      Object.values(students).filter(
        (student) => student.city.toLowerCase() === city.toLowerCase()
      )
    );
  }
  //returns the students who match the query parameters passed in (name, interest,)
  // return res.send(filteredStudents);
});

server.get("/students/interest/:interest", (req, res) => {
  const { interest } = req.params;
  if (interest) {
    return res.send(
      Object.values(students).filter((student) =>
        student.interest.includes(interest.toLowerCase())
      )
    );
  }
});

server.get("/students/name/:name", (req, res) => {
  const { name } = req.params;
  if (name) {
    // make a variable to hold student data based on name passed
    const student = students[name.toLowerCase()];
    // check to see if student is in DB
    if (student) {
      // send student object as response
      return res.send(student);
    }
    // send error if student is not in DB
    return res
      .status(404)
      .send({ error: `Student by name of ${name.toUpperCase()} not found` });
  }
});

//Create => POST
// POST /destinations
// What is a destination. What makes a destination record?
/*
  - destination name (REQUIRED)
  - location (REQUIRED)
  - photo
  - description
*/
server.post("/destinations", (req, res) => {
  //ONLY grab what I need
  const { destination, location, photo, description } = req.body;

  // VALIDATE I got what I expected (i.e destination & location are BOTH present AND not empty strings)
  if (
    !destination ||
    !location ||
    destination.length === 0 ||
    location.length === 0
  ) {
    return res
      .status(400)
      .send({ error: "Destination and Location are BOTH required" });
  }

  // Create the new object to put in my DB
  const newDest = {
    destination,
    location,
    photo: photo && photo.length !== 0 ? photo : "dfajkfhjakdfhksjdf",
    description: description ? description : "",
  };
  // adds newDest obj to DB
  destinations.push(newDest);
  // redirects to GET destinations. 303 status code redirects to GET paths only
  res.redirect(303, "/destinations");
});

server.get("/", (req, res) => {
  res.send("<h1>This is the landing page</h1>");
});

server.get("/destinations", (req, res) => {
  res.send(destinations);
});
