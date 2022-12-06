const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactAndShippingDetailsSchema = new Schema({
    FirstName: {
        type: String
    },
    LastName: { //DECLARES EMAIL AS UNIQUE VALUE 
        type: String
    },
    Address: {
        type: String
    },
    Email: { //DECLARES EMAIL AS UNIQUE VALUE 
        type: String, unique: true, required: true 
    }, 
    ContactNumber: {
        type: Number
    },
}, {timestamps: true})


const ContactAndShippingDetails = mongoose.model('ContactAndShippingDetails', ContactAndShippingDetailsSchema )
module.exports = ContactAndShippingDetails
