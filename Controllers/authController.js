const emailValidator = require("../constants/validator");
const Users = require("../models/users");
var md5 = require("md5");

const userRegistration = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const newUser = new Users(req.body);
    console.log(req.body.email);
    console.log(emailValidator(req.body.email));
    if (!emailValidator(req.body.email)) {
      return res.json({
        status: 400,
        message: "Enter Valid Email",
      });
    }
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      return res.json({
        status: 200,
        message: "User already exist",
      });
    }

    console.log(req.body.password);
    newUser
      .save()
      .then((result) => {
        return res.json({
          status: 201,
          message: "User created Successfully",
        });
      })
      .catch((err) => {
        return res.json({
          status: 400,
          message: "Bad request",
        });
      });
  } catch (error) {
    return res.json({
      status: 500,
      message: "server error",
    });
  }
};
const userLogin = (req, res) => {
  let { email, password } = req.body;
  password = md5(password);
  Users.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return res.json({
          status: 401,
          message: "Authetication Failed",
        });
      }

      return res.json({
        status: 200,
        message: user,
      });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        message: "Server Error",
      });
    });
};
const userLogout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      status: 200,
      message: "User has been logged out.",
    });
  });
};
const getUser = (req, res) => {
  Users.find()
    .then((user) => {
      return res.json({
        status: 200,
        message: user,
      });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        message: "Server Error",
      });
    });
};
module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  getUser,
};
