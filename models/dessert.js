//Product SCHEMA
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dessertSchema = new Schema({
    imagePath:{type:String, required: true
    },
    dessert_name: {
        type: String
    },
    dessert_desc: { 
        type: String
    },
    dessert_price: {
        type: Number
    }
},{timestamps: true})

const Dessert = mongoose.model('Dessert', dessertSchema);
module.exports = Dessert




