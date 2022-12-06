const Meal = require('./models/meal');
const mongoose = require('mongoose');


require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();
const path =require ('path');

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Server Database Connection Established...')
})

const meals = [
        new Meal({
        imagePath:'https://www.kawalingpinoy.com/wp-content/uploads/2013/02/filipino-pork-adobo-3.jpg',
        meal_name: 'Pork Adobo',
        meal_desc: 'Meals',
        meal_price: 75
}),
        new Meal({
        imagePath:'https://www.lutongpinoyrecipe.com/wp-content/uploads/2020/12/lutong-pinoy-pork-afritada-1200x1411.jpg',
        meal_name: 'Pork Afritada',
        meal_desc: 'Meals',
        meal_price: 85
}),
    new Meal({
        imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Authentic_Kapampangan_Sisig.jpg/240px-Authentic_Kapampangan_Sisig.jpg',
        meal_name: 'Pork Sisig',
        meal_desc: 'Meals',
        meal_price: 105
}),
    new Meal({
        imagePath:'https://www.kawalingpinoy.com/wp-content/uploads/2020/06/authentic-chicken-inasal-8.jpg',
        meal_name: 'Chicken Inasal',
        meal_desc: 'Meals',
        meal_price: 105
}),
    new Meal({
        imagePath:'http://images.summitmedia-digital.com/yummyph/images/2017/09/06/nilaga.jpg',
        meal_name: 'Nilagang Baka',
        meal_desc: 'Meals',
        meal_price: 110
}),
new Meal({
    imagePath:'https://www.knorr.com/content/dam/unilever/knorr_world/philippines/photography_and_pictures/sinigang-na-salmon-recipe-84292833-jpg.jpg',
    meal_name: 'Sinigang na Salmon',
    meal_desc: 'Meals',
    meal_price: 110
}),
];

var done = 0;
for(var i=0; i<meals.length;i++){
    meals[i].save(function(err,res){
        done++;
        if(done===meals.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
