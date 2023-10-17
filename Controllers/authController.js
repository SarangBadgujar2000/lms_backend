const emailValidator = require("../constants/validator");
const Users = require("../models/users");
var md5=require("md5")


const userRegistration = (req, res) => {
    try {
        const user = new Users(req.body);
        console.log(req.body.email);
        console.log(emailValidator(req.body.email));
        if(!emailValidator(req.body.email)){
            return res.json({
                status:400,
                message:"Enter Valid Email"
            })
        }
        req.body.password=md5(req.body.password)
        user.save()
            .then((result) => {
                return res.json({
                    status: 200,
                    message: "User created Successfully"
                })
            })
            .catch((err) => {
                return res.json({
                    status: 400,
                    message: "bad request"
                })
            })
    } catch (error) {
        return res.json({
            status: 500,
            message: "server error"
        })
    }
}
module.exports={
    userRegistration
}