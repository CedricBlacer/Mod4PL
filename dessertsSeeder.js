const mongoose = require('mongoose');
const Dessert = require('./models/dessert');
require('dotenv').config();
const express = require('express')


mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Server Database Connection Established...')
})

const desserts = [
        new Dessert({
        imagePath:'https://www.allrecipes.com/thmb/IRe_odRpELH0WqH-t7w2MZ9YAzg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/691985-f05d7a4bda2d498f8142af132a44d2ed.jpg',
        dessert_name: 'Leche Flan',
        dessert_desc: 'Dessert',
        dessert_price: 75
}),
        new Dessert({
        imagePath:'https://i2.wp.com/www.foyhotech.it/wp-content/uploads/2020/03/tortanut.jpg',
        dessert_name: 'Chocolate Cake',
        dessert_desc: 'Dessert',
        dessert_price: 75
}),
    new Dessert({
        imagePath:'https://www.simplyrecipes.com/thmb/If_xkTOtijo9QsnQ-eezv0PinVA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Cinnamon-Ice-Cream-LEAD-11-9ced0ddb1d5544e1a4a3ae65f2d069b7.jpg',
        dessert_name: 'Ice Cream',
        dessert_desc: 'Dessert',
        dessert_price: 50
}),
    new Dessert({
        imagePath:'https://www.recipetineats.com/wp-content/uploads/2016/08/Brownies_0.jpg',
        dessert_name: 'Chocolate Brownies',
        dessert_desc: 'Dessert',
        dessert_price: 45
})
    
];

var done = 0;
for(var i=0; i<desserts.length;i++){
    desserts[i].save(function(err,res){
        done++;
        if(done===desserts.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
