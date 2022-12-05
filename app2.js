const express = require('express')
const nodemailer =require('nodemailer')
const app = express()


function sendEmail(){
    return new Promise((resolve , reject) =>{

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'simplytastygrp4@gmail.com',
                pass:'fnrpenhyvhgevzhi'
            }
        })

        const mail_configs ={
            from:'simplytastygrp4@gmail.com',
            to:'jamesonlouis.celzo.cics@gmail.com',
            subject:'testing lang',
            text:'testing lang poooo'

        }

        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error)
                return reject({message: 'an error occured'})
            }
            return resolve({message:"Email sent sccusss"})
        })





    })

}

app.get("/", (req,res) => {
    sendEmail()
    .then(response => res.send(response.message))
    .catch(error => res.status(500).send(error.message))
})

app.listen(3000, () =>{
    console.log(`Server running at port 3000`)
})