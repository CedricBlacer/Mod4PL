const mongoose = require('mongoose');
const Snack = require('./models/snack');
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

const snacks = [
        new Snack({
        imagePath:'https://www.onceuponachef.com/images/2021/11/Best-Chocolate-Chip-Cookies.jpg',
        snack_name: 'Chocolate Chip Cookies',
        snack_desc: 'Snacks',
        snack_price: 75
}),
        new Snack({
        imagePath:'https://www.bestrestaurants.com.au/media/xiwbnac3/5.jpg',
        snack_name: 'Pizza',
        snack_desc: 'Snacks',
        snack_price: 85
}),
    new Snack({
        imagePath:'https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg',
        snack_name: 'French Fries',
        snack_desc: 'Snacks',
        snack_price: 105
}),
    new Snack({
        imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nachos-cheese.jpg/1200px-Nachos-cheese.jpg',
        snack_name: 'Nachos',
        snack_desc: 'Snacks',
        snack_price: 105
})
    
];

var done = 0;
for(var i=0; i<snacks.length;i++){
    snacks[i].save(function(err,res){
        done++;
        if(done===snacks.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
