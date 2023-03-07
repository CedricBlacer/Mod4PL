require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();
const path =require ('path');
const session = require('express-session')

/*
// Set up session middleware AI
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
*/

//import auth routes
const AuthRoute = require('./routes/auth')
const pagesRoute = require('./routes/pages')

//register view engine EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


//ESTABLISHING MONGODB NODESERVER CONNECTION(CHECK .env)
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Server Database Connection Established...')
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// END OF ESTABLISHING MONGODB CONNECTION

// FOR TESTING PURPOSES (REMOVE COMMENTS IF NEEDED)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server running at port ${PORT}`)
})


app.use('/api', AuthRoute) //USE API ROUTE
app.use('/', pagesRoute) //USE PAGES ROUTE