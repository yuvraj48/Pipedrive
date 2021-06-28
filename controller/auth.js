const User = require("../models/user")
const {  validationResult } = require("express-validator");
var expressjwt = require('express-jwt');
var jwt = require('jsonwebtoken');
const {SECRET} =require("../config/prod")


//signup
exports.signup=(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg

    })
  }
const user = new User(req.body)
user.save((err,user)=>{
  if(err){
    return res.status(400).json({
      err:"NOT ABLE TO SAVE"
    })
  }
  res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    companyname:user.companyname
  })
})



  //console.log("REQ_BODY",req.body);
  // res.json({
    //// message:"user-signup"
  // })
};

//signin
exports.signin=(req,res)=>{
  const errors=validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(402).json({
      error: errors.array()[0].msg
    })
  }
  const {email,password}=req.body;
  User.findOne({email},(err,user)=>{
    if(err){
      return res.status(402).json({
        error:"Enter registered Email"
      })
    }
    if(!user.autheticate(password)){
      return res.status(402).json({
        error:"wrong password"
      })
    }
    const token =  jwt.sign({ _id:user._id }, SECRET); 
    res.cookie("token",{ expire: new Date() + 9999 });
    const{_id,name,email}=user;
    return res.json({token,user:{_id,name,email}});
   
  });
};

//middleware
exports.isSignedin=expressjwt({
  secret:process.env.SECRET,
  userProperty:"auth"
})

exports.isAuthenticated=(req,res,next)=>{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if(!checker){
    return res.status(403).json({
      error:"Acess Denied"
    });
  }
  next();
};

  exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout succesfully"
    });
  };
  