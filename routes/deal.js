const express =require("express");
const router=express.Router();

const {dealgetbyid,createdeal,getallpost,findAllContactMade,findMeetingArranged,getSubscription,
    Windeal,Losedeal,paymentSchedule,findNeedsDefined,findNegotiationStarted,findProposalMade,findQualified,getdeal,searchdeal,getwondeal} = require("../controller/deal")
const {isAuthenticated,isSignedin} = require("../controller/auth")
const {getUserById} =require("../controller/user")

router.param("userId",getUserById)
router.param("dealId",dealgetbyid)

router.post("/deal/create/:userId",isSignedin,isAuthenticated,createdeal);
router.get("/deal/:userId",getallpost,isAuthenticated,isSignedin);
router.get("/contact/:userId",isSignedin,findAllContactMade);
router.get("/deals/:dealId/:userId",isSignedin,getdeal)
router.get("/alluserdeal/:userId",isSignedin,getdeal)
router.get("/meeting/:userId",isSignedin,findMeetingArranged);
router.get("/needs/:userId",isSignedin,findNeedsDefined);
router.get("/negotiation/:userId",isSignedin,findNegotiationStarted);
router.get("/proposal/:userId",isSignedin,findProposalMade);
router.get("/Qualified/:userId",isSignedin,findQualified);
router.post("/searching",searchdeal)
router.put("/win/:dealId/:userId",isSignedin,Windeal)
router.put("/lose/:dealId/:userId",isSignedin,Losedeal)
router.put("/subscription/:userId",isSignedin,getSubscription);
router.put("/paymentschedule/:dealId/:userId",isSignedin,paymentSchedule);





module.exports=router;