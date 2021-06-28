const express = require("express")
const router=express.Router()

const {updatePeople,getallpeople,deletePerson,createPerson,persongetbyid,getpeople} = require("../controller/people");
const {isSignedin,isAuthenticated} =require("../controller/auth")
const {getUserById} = require("../controller/user");


router.param("userId",getUserById);
router.param("PersonId",persongetbyid);

router.post("/person/create/:userId",isSignedin,isAuthenticated,createPerson);
router.get("/person",getallpeople);
router.get("/people/:userId",isSignedin,isAuthenticated,getpeople);
router.put("/person/:PersonId/:userId",isSignedin,isAuthenticated,updatePeople);
router.delete("/person/:PersonId/:userId",isSignedin,isAuthenticated,deletePerson);





module.exports=router;