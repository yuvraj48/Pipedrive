const express =require("express");
const router=express.Router();
const nodemailer = require("nodemailer");

router.post("/mail",(req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'pipedriveop@gmail.com',
            pass:'Yuvraj!raj967'
        }

    });

let mailoptions={
    from:'pipedriveop@gmail.com',
    to:data.email,
    subject:` ${data.subject}`,
    html:`
    <p>${data.message}</p>
    `
}
smtpTransport.sendMail(mailoptions,(error,response)=>{
    if(error){
        res.send(error)
    }
    else{
        res.send('success')
    }
})
smtpTransport.close();
})
module.exports=router;