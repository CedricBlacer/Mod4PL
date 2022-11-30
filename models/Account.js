//ACCOUNT SCHEMA
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const accountSchema = new Schema({
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


const Account = mongoose.model('Account', accountSchema)
module.exports = Account

