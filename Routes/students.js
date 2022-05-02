const express = require("express")
const studentsRouter = express.Router()
const {students} = require("../Models/students")

studentsRouter.get("/", (req, res) => {
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
  
  studentsRouter.get("/city/:city", (req, res) => {
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
  
  studentsRouter.get("/interest/:interest", (req, res) => {
    const { interest } = req.params;
    if (interest) {
      return res.send(
        Object.values(students).filter((student) =>
          student.interest.includes(interest.toLowerCase())
        )
      );
    }
  });
  
  studentsRouter.get("/name/:name", (req, res) => {
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

  module.exports = {
      studentsRouter
  }