//basic layout of express
const express = require("express");
const mongoose = require("mongoose");

const UserRoute=require("./routes/UserRoute");
//*
const adminRoute=require("./routes/AdminRoute");
//*
const User=require("./models/User");
const app = express();//***creates an express apllication

// const axios = require("axios");


app.use(express.urlencoded({ extended: false }));
app.use(express.json())//this willl convert my json file to js object

mongoose.connect("mongodb://localhost:27017/jiet", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => {
        console.info("mongo db connected succesfully");
    }).catch(() => {
        console.error("mongodb failed");
    });

//"/signup", /login thease all are called routes
app.use(UserRoute);
app.use(adminRoute);




app.listen(4000, () => {
    console.log("server is running on port 4000 properly");
});
