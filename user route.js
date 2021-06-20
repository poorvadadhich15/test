const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const userController=require("../controller/UserController")
const router = express();
//1 and 2 are basic and always written condition

router.post("/user/signup",userController.signup);
router.post("/user/login", userController.login);

router.get("/user/:id", userController.getuserbyid);

//checking on the basis of two conditions if both conditions true than only it wil show the data
//router.get("/get-user",userController.findUserByFirstNameAndLastName)

//*
router.post("/blog", userController.postBlog);   
router.get("/blog", userController.getBlog);


//router.put("/update/:id",userController.update);


module.exports = router;