const express = require("express")
const router=express.Router()

const {createlead,getallleads,leadgetbyid,deletelead,LeadConversion} = require("../controller/leads");
const {isSignedin,isAuthenticated} =require("../controller/auth")
const {getUserById} = require("../controller/user");


router.param("userId",getUserById);
router.param("LeadId",leadgetbyid);

router.post("/lead/create/:userId",isSignedin,isAuthenticated,createlead);
router.get("/leads/:userId",isSignedin,getallleads);
//router.put("/leads/:LeadId/:userId",isSignedin,isAuthenticated);
router.delete("/leads/:LeadId/:userId",isSignedin,deletelead);
router.put("/convert/:userId",isSignedin,LeadConversion)




module.exports=router;