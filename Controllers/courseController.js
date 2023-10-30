const Courses = require("../models/courses")

const createCourse=(req,res)=>{
    if(req.user.type!=="teacher"){
        return res.status(403).json({
            status:403,
            message:"You are not authorized to create course"
        })
    }
    req.body.teacher_id=req.user.id
    const course=new Courses(req.body)
    course.save()
    .then(result=>{
        return res.json({
            status:201,
            message:"course created  successfully"
        })
    })
    .catch(err=>{
        return res.json({
            status:500,
            message:"Bad request"
        })
    })
}
const getCourses=(req,res)=>{
    const teacher_id=req.params.teacher_id 
    console.log(teacher_id)
    Courses.find({teacher_id})
    .then(result=>{
        return res.status(200).json({
            status:200,
            message:"courses fetched successfully",
            data:result
        })
    })
    .catch(err=>{
        return res.status(500).json({       
            status:500,
            message:"server error"
        })
    })
}
const getCourse = (req,res) => {
    console.log(req.session.user)
    const course_id = req.params.course_id
    Courses.findOne({ _id: course_id })
    .then(result => {
        return res.status(200).json({
            status: 200,
            message: "Course fetched successfully",
            data: result
        })
    })
    .catch(err => {
        return res.status(500).json({
            status: 500,
            message: "Bad request"
        })
    })
}
const updatedCourse=(req,res)=>{
    const course_id=req.params.course_id
    if(req.user.type!=="teacher"){
        return res.status(403).json({
            status:403,
            message:"You are not authorized to update a course"
        })
    }
    Courses.findOneAndUpdate({_id: course_id},req.body)
    .then(result=>{
        return res.status(200).json({
            status:200,
            message:"courses updated successfully",
        })
    })
    .catch(err=>{
        return res.status(500).json({       
            status:500,
            message:"Bad request"
        })
    })
}
module.exports={
    createCourse,
    getCourses,
    getCourse,
    updatedCourse
}