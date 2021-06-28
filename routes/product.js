const express = require("express")
const router=express.Router()

const {getallproduct,createProduct,deleteProduct,updateProduct,productgetbyid} = require("../controller/product");
const {isSignedin,isAuthenticated} =require("../controller/auth")
const {getUserById} = require("../controller/user");


router.param("userId",getUserById);
router.param("ProductId",productgetbyid);

router.post("/product/create/:userId",isSignedin,isAuthenticated,createProduct);
router.get("/products/:userId",isSignedin,getallproduct);
router.put("/product/:ProductId/:userId",isSignedin,isAuthenticated,updateProduct);
router.delete("/product/:ProductId/:userId",isSignedin,isAuthenticated,deleteProduct);





module.exports=router;