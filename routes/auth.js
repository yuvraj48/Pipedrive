const express=require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {signup,signin,signout} = require("../controller/auth")

router.post( "/signup",
[check("name","name should contain at least 3 char").isLength({min:3}),
check("email","email is required").isEmail(),
check("companyname","please add your company name").isLength({min:1}),
check("phone","Only numbers are allowed").isNumeric({min:10}),
check("password","Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character") .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
.isLength({ min: 5 })
.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
]
,signup);

router.post("/signin",
[check("email","email is required").isEmail(),
check("password","password is required").isLength({min:8})
],
signin);
router.get("/signout", signout);

module.exports = router;
