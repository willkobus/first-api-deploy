function verifyInput(req, res, next) {
    //ONLY grab what I need
const { destination, location} = req.body;
    
  
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
  next();
}
 module.exports = {
     verifyInput
 }