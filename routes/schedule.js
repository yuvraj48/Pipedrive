const express = require("express")
const router=express.Router()

const {updateSchedule,getSchedulebyid,deleteSchedule,getallSchedule,createSchedule,getSchedule,createNewSchedule} = require("../controller/schedule");
const {isSignedin,isAuthenticated} =require("../controller/auth")
const {getUserById} = require("../controller/user");
const {dealgetbyid} = require("../controller/deal");


router.param("userId",getUserById);
router.param("ScheduleId",getSchedulebyid);
router.param("dealId",dealgetbyid);

router.post("/activity/create/:userId",isSignedin,isAuthenticated,createSchedule);
router.post("/activity/:dealId/:userId",isSignedin,isAuthenticated,createNewSchedule);
router.get("/activity/:userId",isSignedin,getallSchedule);
router.get("/dealactivity/:dealId",getSchedule);
router.put("/activity/:ScheduleId/:userId",isSignedin,isAuthenticated,updateSchedule);
router.delete("/activity/:ScheduleId/:userId",isSignedin,isAuthenticated,deleteSchedule);





module.exports=router;