const express =require("express");
const router=express.Router();

const {organizationbyid,createorganisation,deleteorganisation,updateorganisation,getorganisation} = require("../controller/organisation")
const {isAuthenticated,isSignedin} = require("../controller/auth")
const {getUserById} =require("../controller/user")

router.param("userId",getUserById)
router.param("organisationId",organizationbyid)

router.post("/organisation/create/:userId",isSignedin,isAuthenticated,createorganisation);
router.get("/organisation",getorganisation);
router.delete("/organisation/:organisationId/:userId",isSignedin,isAuthenticated,deleteorganisation);
router.put("organisation/:organisationId/:userId",isSignedin,isAuthenticated,updateorganisation);

module.exports=router;