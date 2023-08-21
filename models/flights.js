const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const flightSchema = new Schema({
    airline: { type: String, enum: ['American', 'Southwest', 'United', 'JetBlue', 'Delta', 'Spirit'] },
    airport: { type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'BOS', 'BWI', 'FLL', 'IAD', 'ORD', 'ATL'], default: 'BOS' },
    flightNo: { type: Number, required: true, min: 10, max: 9999 },
    departs: {
        type: Date, default: () => {
            const year = Number(new Date().getFullYear()) + 1
            const month = Number(new Date().getMonth())
            const day = Number(new Date().getDate())
            return new Date(Number(new Date().getFullYear()) + 1, Number(new Date().getMonth()), Number(new Date().getDate()))
        }
    },
    destination: destinationSchema
})

const destinationSchema = new Schema({
    airport: { type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'BOS', 'BWI', 'FLL', 'IAD', 'ORD', 'ATL'] },
    arrival: {
        type: Date, default: () => {
            const year = Number(new Date().getFullYear()) + 1
            const month = Number(new Date().getMonth())
            const day = Number(new Date().getDate())
            return new Date(Number(new Date().getFullYear()) + 1, Number(new Date().getMonth()), Number(new Date().getDate()+1))
        }
    }
})

module.exports = mongoose.model('Flight', flightSchema)
