const express = require("express");
const router = express.Router();
const User =require('../models/user')

const {getUser,getUserById,updateuser} = require("../controller/user");
const {isAuthenticated,isSignedin} = require("../controller/auth");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedin,isAuthenticated,getUser);
router.put("/user/:userId",isSignedin,isAuthenticated,updateuser);




module.exports=router;