//IMPORT USER MODEL IN /models/user
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const listUsers = (req,res,next) =>{
    //Mongoose query that returns all users from db
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}


const register = (req,res,next) => {
    //Mongoose query that adds a user to db
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        })
        user.save()
        .then(user => {
            res.redirect('/CreateAccount')
        })
        .catch(error => {
            res.json({
                message: 'That Email is Already Taken... Please Try Another One.'
            })
        })
    })
}

const login = (req,res,next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
                    res.redirect('/')

                }else{
                    res.json({
                        message: 'Password Doesnt Match!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found'
            })
        }
    })

}

module.exports = {
    listUsers, register, login
}