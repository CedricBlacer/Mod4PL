//Product SCHEMA
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    imagePath:{type:String, required: true
    },
    prod_name: {
        type: String
    },
    prod_desc: { 
        type: String
    },
    prod_price: {
        type: Number
    }
},{timestamps: true})

const Product = mongoose.model('Product', productSchema);
module.exports = Product




