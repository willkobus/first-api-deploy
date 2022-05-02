const express = require("express")
const destinationsRouter = express.Router()
const {destinations} = require("../Models/destinations")
const axios = require("axios")
const {verifyInput} = require("../Middleware/verification")

destinationsRouter.use(express.json());

destinationsRouter.post("/", verifyInput,


async (req, res) => {
    
    const { destination, location, description} = req.body;
    // Pixabay URL with API_key and the with location and destiation as query
    // Use axios or node-fetch
    
    const pixabayURL = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${destination} ${location}`
    const {data} = await axios.get(pixabayURL)
  
    const photos = data.hits
    const randIdx = Math.floor(Math.random() * photos.length)
  
    // Create the new object to put in my DB
    const newDest = {
      destination,
      location,
      photo: photos.length !== 0 ? photos[randIdx].largeImageURL : "https://wttc.org/DesktopModules/MVC/NewsArticleList/images/141_20201013185512_Consumer%20Survey%20Finds%2070%20Percent%20of%20Travelers%20Plan%20to%20Holiday%20in%202021.jpg",
      description: description ? description : "",
    };
    // adds newDest obj to DB
    
    destinations.push(newDest)
    // redirects to GET destinations. 303 status code redirects to GET paths only
    res.redirect(303, "/destinations");
  });

  destinationsRouter.get("/", (req, res) => {
    res.send(destinations);
  });

  module.exports = {
      destinationsRouter
  }