const Product = require('./models/product');
const mongoose = require('mongoose');


require('dotenv').config();
const path =require ('path');

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Server Database Connection Established...')
})

const products = [
        new Product({
        imagePath:'https://www.kawalingpinoy.com/wp-content/uploads/2013/02/filipino-pork-adobo-3.jpg',
        prod_name: 'Pork Adobo',
        prod_desc: 'Meals',
        prod_price: 75
}),
    new Product({
        imagePath:'https://4.bp.blogspot.com/-MXq0shV80Bo/XGif5tjlRwI/AAAAAAAASKA/VngBBchvNRA0ZKIodFLtKHt36E_Gd5CuwCLcBGAs/s1600/pork%2Bafritada.jpg',
        prod_name: 'Pork Afritada',
        prod_desc: 'Meals',
        prod_price: 85
})
];

var done = 0;
for(var i=0; i<products.length;i++){
    products[i].save(function(err,res){
        done++;
        if(done===products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
