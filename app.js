const express = require('express');
const path =require ('path');
const app = express();

//register view engine EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req,res) => {
    res.render('index', {title:'Simply Tasty | Home'})
})

app.get("/OurMenu", (req,res) => {
    res.render('OurMenu', {title:'Choose Your Food Category'})
})

app.use((req, res) =>{
    res.status(404).render('404', {title: 'Page not Found'})
})

app.listen(3000, function(err){
    if(err) throw error
    console.log("server running at port 3000...")
})