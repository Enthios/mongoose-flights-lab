const Flights = require("../models/flights");
const Ticket = require("../models/ticket");

module.exports = {
  new: newTicket,
  create,
  delete: deleteTicket
};

async function newTicket(req, res) {
  const id = req.params.id;
  res.render("ticket/new", { title: 'Buy Ticket', id, letters: ['A', 'B', 'C', 'D', 'E', 'F'] })
}

async function create(req, res) {
  try {
    const ticketData = { ...req.body }
    ticketData.seat = `${ticketData.seatLetter}${ticketData.seatNumber}`

    const flightId = req.params.id
    const foundFlight = await Flights.findById(flightId)
    ticketData.flight = foundFlight
    await Ticket.create(ticketData)
    res.redirect(`/flights/${flightId}`)

  } catch (err) {
    console.log(err)
    res.redirect('/')
  }

}

async function deleteTicket(req, res) {
  Flights.findById(req.params.flightId).then(function(flight) {
    Ticket.find({flight: flight._id}).then(function(tickets) {
      Ticket.deleteOne({"_id": req.params.ticketId}).then(function(){
        res.redirect(`/flights/${flight._id}`)
      })
      .catch(function(err){
        console.log(err)
      })
    })
    .catch(function(err){
        console.log(err)
    })
})
}