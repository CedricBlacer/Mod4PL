const express = require('express');
const path =require ('path');
const app = express();

//register view engine EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req,res) => {
    res.render('index', {title:'Simply Tasty | Home'})
})

app.get("/Account", (req,res) => {
    res.render('Account', {title:'Account'})
})

app.get("/Cart", (req,res) => {
    res.render('Cart', {title:'Your Cart'})
})

app.get("/Checkout", (req,res) => {
    res.render('Checkout', {title:'Finalize Your Orders'})
})

app.get("/ContanctAndShippingDetails", (req,res) => {
    res.render('ContanctAndShippingDetails', {title:'Enter Contact'})
})

app.get("/CreateAccount", (req,res) => {
    res.render('CreateAccount', {title:'Register Your Account'})
})

app.get("/Desserts", (req,res) => {
    res.render('Desserts', {title:'Choose Your Desserts'})
})

app.get("/EnterNewPassword", (req,res) => {
    res.render('EnterNewPassword', {title:'Create Password'})
})

app.get("/ForgotPassword", (req,res) => {
    res.render('ForgotPassword', {title:'Forgot Password'})
})

app.get("/Meals", (req,res) => {
    res.render('Meals', {title:'Main Dishes'})
})

app.get("/OurMenu", (req,res) => {
    res.render('OurMenu', {title:'Choose Your Food Category'})
})

app.get("/PaymentDetails", (req,res) => {
    res.render('PaymentDetails', {title:'Payment Details'})
})

app.get("/PlaceOrder", (req,res) => {
    res.render('PlaceOrder', {title:'Place Your Order'})
})

app.get("/ResetPassword", (req,res) => {
    res.render('ResetPassword', {title:'Reset Your Password'})
})

app.get("/SendEmail", (req,res) => {
    res.render('SendEmail', {title:'Send Email'})
})

app.get("/Signup", (req,res) => {
    res.render('Signup', {title:'Register'})
})

app.get("/Snacks", (req,res) => {
    res.render('Snacks', {title:'Snacks'})
})


app.use((req, res) =>{
    res.status(404).render('404', {title: 'Page not Found'})
})

app.listen(3000, function(err){
    if(err) throw error
    console.log("server running at port 3000...")
})
