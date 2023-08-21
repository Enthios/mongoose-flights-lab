const Flights = require('../models/flights')
const Ticket = require('../models/ticket')


module.exports = {
    index,
    new: newFlights,
    create,
    show,
    delete: cancelFlight
}
function newFlights(req, res) {
    res.render('flights/new', { title: "Book a Flight", errorMsg: "", airlines: ['American', 'Southwest', 'United', 'JetBlue', 'Delta', 'Spirit'].sort(), codes: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'BOS', 'BWI', 'FLL', 'IAD', 'ORD', 'ATL'].sort() })
}

async function index(req, res) {
    Flights.find({})
        .then(results => res.render('flights/index', { title: 'Flight Index', flights: results.sort(function (a, b) { return a.departs - b.departs }) }))
        .catch(err => res.send(err))
}


async function create(req, res) {
    const flightsData = { ...req.body };

    console.log(flightsData)

    if (flightsData.departs === '') {
        delete flightsData.departs
    }
    
    console.log(flightsData)
    
    try {
        const generatedFlight = await Flights.create(flightsData)
        res.redirect('flights')
    } catch (err) {
        console.log(err)
        res.render('flights/new', { title: "Book a Flight", errorMsg: "", airlines: ['American', 'Southwest', 'United', 'JetBlue', 'Delta', 'Spirit'].sort(), codes: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'BOS', 'BWI', 'FLL', 'IAD', 'ORD', 'ATL'].sort() })
    }
    
}

async function show(req, res) {
    Flights.findById(req.params.id).then(function (flight) {
        Ticket.find({ flight: flight._id }).then(function (tickets) {
            res.render("flights/show", { title: "Flight Details", flight, tickets, codes: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'BOS', 'BWI', 'FLL', 'IAD', 'ORD', 'ATL'].sort() })
        })
            .catch(function (err) {
                console.log(err)
            })
    })
        .catch(function (err) {
            console.log(err)
        })
}

async function cancelFlight(req, res) {
    Flights.findById(req.params.id).then(function (flight) {
        Flights.deleteOne({ "_id": flight._id }).then(function () {
            res.redirect(`/flights`)
        })
        .catch(function (err) {
            console.log(err)
        })
    })

}