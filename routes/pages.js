const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const Meal = require('../models/meal');
const Snack = require('../models/snack');
const Cart = require('../models/cart');
const Dessert = require('../models/dessert');
//ROUTES
router.get("/", (req,res) => {
    res.render('index', {title:'Simply Tasty | Home'})
})

router.get("/Account", AuthController.authenticateLogin, (req,res) => {
    res.render('Account', {title:'Account'})
})

router.get("/Cart", (req,res) => {
    res.render('Cart', {title:'Your Cart'})
})

router.get("/Checkout", (req,res) => {
    res.render('Checkout', {title:'Finalize Your Orders'})
})

router.get("/ContanctAndShippingDetails", (req,res) => {
    res.render('ContanctAndShippingDetails', {title:'Enter Contact'})
})

router.get("/CreateAccount", (req,res) => {
    res.render('CreateAccount', {title:'Register Your Account'})
})

router.get('/Desserts', function (req, res, next){
    var desserts = Dessert.find(function(err, docs){
        var dessertChunks =[];
        var chunkSize =3;
        for (var i=0; i<docs.length; i +=chunkSize){
            dessertChunks.push(docs.slice(i, i+chunkSize))
        }
        res.render('Desserts', {title:'Desserts', desserts: docs})
    })
    
});

router.get("/EnterNewPassword", (req,res) => {
    res.render('EnterNewPassword', {title:'Create Password'})
})

router.get("/ForgotPassword", (req,res) => {
    res.render('ForgotPassword', {title:'Forgot Password'})
})

router.get('/Meals', function (req, res, next){
    var meals = Meal.find(function(err, docs){
        var mealChunks =[];
        var chunkSize =3;
        for (var i=0; i<docs.length; i +=chunkSize){
            mealChunks.push(docs.slice(i, i+chunkSize))
        }
        res.render('Meals', {title:'Meals', meals: docs})
    })
    
});

router.get("/OurMenu", (req,res) => {
    res.render('OurMenu', {title:'Choose Your Food Category'})
})

router.get("/PaymentDetails", (req,res) => {
    res.render('PaymentDetails', {title:'Payment Details'})
})

router.get("/PlaceOrder", (req,res) => {
    res.render('PlaceOrder', {title:'Place Your Order'})
})

router.get("/ResetPassword", (req,res) => {
    res.render('ResetPassword', {title:'Reset Your Password'})
})

router.get("/SendEmail", (req,res) => {
    res.render('SendEmail', {title:'Send Email'})
})

router.get("/Signup", (req,res) => {
    res.render('Signup', {title:'Register'})
})

router.get('/Snacks', function (req, res, next){
    var snacks = Snack.find(function(err, docs){
        var snackChunks =[];
        var chunkSize =3;
        for (var i=0; i<docs.length; i +=chunkSize){
            snackChunks.push(docs.slice(i, i+chunkSize))
        }
        res.render('Snacks', {title:'Snacks', snacks: docs})
    })
    
});

router.get('/add-to-cart/:id', function(req, res, next){
    var productId = req.params.id;
    //create a new cart and check in session if old cart exits
    var cart = new Cart(req.session.cart ? req.session.cart: {});
  
    Product.findById(productId, function(err, product){
      if (err){
        return res.redirect('/stuff');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/Cart.ejs');
    });
  });

router.get("/NoAccount", (req,res) => {
    res.render('NoAccount', {title:"You're not Signed In"})
})

router.use((req, res) =>{
    res.status(404).render('404', {title: 'Page not Found'})
})


module.exports = router