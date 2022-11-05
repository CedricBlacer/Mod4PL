//USER SCHEMA
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String
    },
    email: { //DECLARES EMAIL AS UNIQUE VALUE 
        type: String, unique: true, required: true 
    },
    password: {
        type: String
    }
}, {timestamps: true})


const User = mongoose.model('User', userSchema)
module.exports = User

