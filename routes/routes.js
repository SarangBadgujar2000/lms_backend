const express= require("express");
const { userRegistration,userLogin,getUser } = require("../Controllers/authController");
const { checkAuth } = require("../constants/auth");
var passport = require("passport");
const { isAuthenticated } = require("../passportConfig");
const router=express.Router();

router.post('/registerUser',userRegistration)
router.post('/userLogin',passport.authenticate('local'), userLogin)
router.get('/getUser',isAuthenticated,getUser)


module.exports=router