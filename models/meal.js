//Product SCHEMA
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema({
    imagePath:{type:String, required: true
    },
    meal_name: {
        type: String
    },
    meal_desc: { 
        type: String
    },
    meal_price: {
        type: Number
    }
},{timestamps: true})

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal




