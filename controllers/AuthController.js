//IMPORT ACCOUNT MODEL IN /models/user TEST
const Account = require('../models/Account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ContactAndShippingDetails = require('../models/ContactAndShippingDetails')
const PaymentDetails = require ('../models/PaymentDetails')

//DISPLAY ALL USER ACCOUNTS
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

//REGISTER AN ACCOUNT
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
            res.redirect('/AccountExist')
        })
    })
}

var token; //VARIABLE FOR login and authenticate functions
var username;

//LOGIN AN ACCOUNT
const login = (req,res,next) => {
    username = req.body.username
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
                    token = jwt.sign({name: account.name}, 'verySecretValue', {expiresIn: '20m'})
                    res.redirect('/')

                }else{
                    res.redirect('/WrongLogin')
                }
            })
        }else{
            res.redirect('/AccountNotExist')
        }
    })

}

//AUTHENTICATE LOGIN PAGE
const authenticateLogin = (req, res, next)=>{
    try{
        token
        const decode = jwt.verify(token, 'verySecretValue')

        req.user = decode

        res.render('AccountSignedIn', {User: username})

    }catch(error){
        next()
    }
}

const signOut = (req, res)=>{
    token = ' '
    res.redirect('/Account')
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
            res.redirect('/AccountNotExist')
        }
    })
}
 
//FOR 'EnterNewPassword.ejs' Page
const changePassword2 = (req,res) => {
    console.log(name)


    if(req.body.newPassword == req.body.cnewPassword){
        bcrypt.hash(req.body.newPassword, 10, function(err, hashedPass){
            
            Account.findOneAndUpdate({email: name}, {password: hashedPass})
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
        res.redirect('/PasswordDoesntMatch')
    }
}


//FOR 'ContactAndShippingDetails.ejs' Page
const CollectShippingDetails= (req,res,next) => {
    bcrypt.hash(req.body.Address, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let collectContactAndShippingDetails = new ContactAndShippingDetails ({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Address: hashedPass,
            Email: req.body.Email,
            ContactNumber: req.body.ContactNumber,
           
          
        })
        collectContactAndShippingDetails.save()
        .then(collectContactAndShippingDetails => {
            res.redirect('/PaymentDetails')
        })
        .catch(error => {
            res.json({
                message: 'Please Try Again.'
            })
        })
    })
}

//FOR PAYMENT DETAILS
const CollectGcashInfo1= (req,res,next) => {
    let collectGcashInfo = new PaymentDetails ({
        GcashName: req.body.GcashName,
        GcashNumber: req.body.GcashNumber
    })
    
    collectGcashInfo.save()
    .then(collectGcashInfo => {
        res.redirect('/PlaceOrder')
    })
    .catch(error => {
        res.json({
            message: 'Please Try Again.'
        })

    })
}

//MIDDLEWARE TO AUTHENTICATE ROUTES USING LOGIN
const authenticate = (req, res, next)=>{
    try{
        token
        const decode = jwt.verify(token, 'verySecretValue')

        req.user = decode
        next()

    }catch(error){
        res.redirect('/NoAccount')

    }
}




module.exports = {
    listAccounts, register, login, changePassword1, changePassword2, CollectShippingDetails, CollectGcashInfo1, authenticate, authenticateLogin, signOut

}