//IMPORT ACCOUNT MODEL IN /models/user
const Account = require('../models/Account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ContactAndShippingDetails = require('../models/ContactAndShippingDetails')

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


var name; //EMAIL VARIABLE FOR CHANGE PASSWORD METHODS


//FOR 'ForgotPassword.ejs' Page
const changePassword1 = (req,res,next) => {
    name = req.body.name

    Account.findOne({$or: [{email:name}]})
    .then(account => {
        if(account){
            res.redirect('/EnterNewPassword')// REDIRECT TO "ENTER NEW PASSWORD" PAGE
            return
        }else{
            res.json({
                message: 'No account found associated with that email'
            })
        }
    })
}
 
//FOR 'EnterNewPassword.ejs' Page
const changePassword2 = (req,res) => {
    console.log(name)

    if(req.body.newPassword == req.body.cnewPassword){
        bcrypt.hash(req.body.newPassword, 10, function(err, hashedPass){
            let updatedData = {
                password: hashedPass
            }
        
            Account.findOneAndUpdate(name, {$set: updatedData})
            .then(() => {
                res.redirect('/ResetPassword')
            })
            .catch(error => {
                res.json({
                    //message: 'An error occured!'
                    error:err
                })
                console.log(name)
            })
    
        })

    }else{
        res.json({
            message: 'Password dont match'
        })
    }
}
const CollectShippingDetails= (req,res,next) => {
    bcrypt.hash(req.body.Address, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let contactAndShippingDetails = new CollectShippingDetails ({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Address: hashedPass,
            email: req.body.Email,
            ContactNumber: req.body.ContactNumber,
           
          
        })
        contactAndShippingDetails.save()
        .then(ContactAndShippingDetails => {
            res.redirect('/PaymentDetails')
        })
        .catch(error => {
            res.json({
                message: 'Please Try Again.'
            })
        })
    })
}




module.exports = {
    listAccounts, register, login, changePassword1, changePassword2, ContactAndShippingDetails
}