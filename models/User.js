//USER SCHEMA
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String
    },
    email: { //DECLARES EMAIL AS UNIQUE VALUE USING uniqueValidator plugin
        type: String, index: true, unique: true, required: true 
    },
    password: {
        type: String
    }
}, {timestamps: true})


const User = mongoose.model('User', userSchema)
userSchema.plugin(uniqueValidator); // Apply the uniqueValidator plugin to userSchema
module.exports = User

