const express= require("express");
const { userRegistration } = require("../Controllers/authController");
const router=express.Router();

router.post('/registerUser',userRegistration)

module.exports=router