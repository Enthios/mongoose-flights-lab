const Flights = require('../models/flights')

module.exports = {
  create
};
  
async function create(req, res) {
  const flight = await Flights.findById(req.params.id);

  if (req.body.arrival === ''){
    delete req.body.arrival
  }

  flight.destination = (req.body);
  
  try {
    await flight.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${flight._id}`);
}