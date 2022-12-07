//----------------------MYSQL CODES----------------------------------//
//DISCONTINUED AFTER MIGRATING TO MONGODB NOSQL
const mysql = require('mysql2')


let con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'macahiya27',
    database: 'Account'
})

con.connect((err) =>{
    if(!err) console.log("Connected to the Account database server...")

})

let createTable = "CREATE TABLE IF NOT EXISTS Account (id INT PRIMARY KEY, \
   user VARCHAR(50), password VARCHAR(100))"

   con.query(createTable, (err, results) => {
    if(!err) console.log("Account table was created...")
    else console.log ("Unable to Create the table")

})
let createRecord = "INSERT INTO Account VALUES (4, 'ej', 'feloniaaa')"
con.query(createRecord, (err, results) => {
    if(!err) console.log("Record successfully registered...")
    else console.log ("Unable to register record")

})
