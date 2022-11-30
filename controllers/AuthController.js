//IMPORT ACCOUNT MODEL IN /models/user
const Account = require('../models/Account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const listAccounts = (req,res,next) =>{
    //Mongoose query that returns all accounts from db
    Account.find()
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
    //Mongoose query that adds an account to db
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let account = new Account ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        })
        account.save()
        .then(account => {
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

    Account.findOne({$or: [{email:username}]})
    .then(account => {
        if(account){
            bcrypt.compare(password, account.password, function(err, result) {
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name: account.name}, 'verySecretValue', {expiresIn: '1h'})
                    res.redirect('/')

                }else{
                    res.json({
                        message: 'Password Doesnt Match!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No account found'
            })
        }
    })

}

module.exports = {
    listAccounts, register, login
}