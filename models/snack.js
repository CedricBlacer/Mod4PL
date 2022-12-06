//Product SCHEMA
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snackSchema = new Schema({
    imagePath:{type:String, required: true
    },
    snack_name: {
        type: String
    },
    snack_desc: { 
        type: String
    },
    snack_price: {
        type: Number
    }
},{timestamps: true})

const Snack = mongoose.model('Snack', snackSchema);
module.exports = Snack




