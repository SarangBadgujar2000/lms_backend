const express= require("express");
const { userRegistration,userLogin,getUser, userLogout } = require("../Controllers/authController");
const { checkAuth } = require("../constants/auth");
var passport = require("passport");
const { isAuthenticated } = require("../passportConfig");
const { createCourse, getCourses,updatedCourse, getCourse } = require("../Controllers/courseController");
const router=express.Router();

//authController
router.post('/registerUser',userRegistration)
router.post('/userLogin',passport.authenticate('local'), userLogin)
router.get('/userLogout',userLogout)
router.get('/getUser',isAuthenticated,getUser)

//courseController
router.post('/createCourse',isAuthenticated,createCourse)
router.put('/updatedCourse/:course_id',isAuthenticated,updatedCourse)
router.get('/getCourses/:teacher_id',isAuthenticated,getCourses)
router.get('/getCourse/:course_id',isAuthenticated,getCourse)



module.exports=router