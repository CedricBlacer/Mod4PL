const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentDetailsSchema = new Schema({
   	GcashName: {
        type: String
    },
    GcashNumber: {
        type: Number
    },
}, {timestamps: true})


const PaymentDetails = mongoose.model('PaymentDetails', PaymentDetailsSchema  )
module.exports = PaymentDetails
