const User = require("../models/User");
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");


//findUserByFirstNameAndLastName
/*
exports.findUserByFirstNameAndLastName = (req, res) => {
    let { firstName, lastName } = req.query;
    User.find({ firstName: firstName, lastName: lastName })
        .then((userArray) => {
            if (userArray.length == 0) {
                console.error(`no user found with first name:${firstName} & ${lastName}`);
                return res.status(404).send("user not found");
            }
            return res.status(200).send(userArray);
        })
        .catch((error) => {
            console.error("error occured ", error);
            return res.status(500).send("ERROR");
        });
};
*/
// sign up
exports.signup = (req, res) => {
    let { firstName, lastName, email, password } = req.body;
    let user = new User({
        firstName,
        lastName,
        email,
        password

    });
    user
        .save()

        .then(() => res.status(200).send(user))//user in promise if the data is found it will store and promise chlu hojayega

        .catch((error) => {
            console.error(error);
            return res.status(500).send("ERROR")
        });

};

//login

exports.login = (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            console.info(`user with email:${email} was successfully found`)
            if (user.password === password) {
                console.info("login succesfully");
                return res.status(200).send("login success")
            }
            console.warn("password incorrect");
            return res.status(401).send("password was incorrect");



        }).catch((user) => {
            console.error(`user with email ${email} does not exist`);
            return res.status(400).send(`user with email ${email} does not exist!! `)

        });
};


exports.getuserbyid = (req, res) => {
    let id = req.params.id;//it will store which i will give the id for searching
    id = mongoose.Types.ObjectId(id);//converting string id to object id first
    User.findOne({ _id: id })
        .then((user) => {
            if (user) {
                console.info("user found ")

                return res.status(200).send(user);

            }
            console.error("user was not found");
            return res.status(404).send("NOT FOUND");

        }).catch((user) => {
            console.log("user not found");
            return res.status(404).send(user);
        });
};

//update
/*
exports.update = (req, res) => {
    let { firstName, lastName, email, password } = req.body;
    let id = req.params.id;
    id = mongoose.Types.ObjectId(id);
    User.updateOne(
        { _id: id },
        { $set: { firstName, lastName, email, password } }
    )
        .then(() => {
            console.info("update succesful");
            res.status(200).send({ firstName, lastName, email, password });
        })
        .catch((error) => {
            console.error("there was an error while updating");
            return res.status(500).send("there was an error while updating the user")
        });
};
*/

exports.postBlog = (req, res) => {
    let { heading, body, userID } = req.body;
    let blog = new Blog({
        heading,
        body,
        userID,
    });
    blog.save()
    .then(() => res.status(200).send(blog))
        .catch((error) => {
            console.log(error);
            return res.status(500).send("ERROR");
        });
};

exports.getBlog = (req, res) => {
    let { heading, userID } = req.body;
    Blog.findOne({ userID: userID}) 
        .then((blog) => {        
            console.info(`Blog with userID: ${userID} was successfully found!`);
            if(heading === blog.heading) {
                const token = JWT.sign(               
                    {  
                        userID: blog.userID,
                    },
                    "JIETSecretKey",           
                    {
                        expiresIn: "1h"
                    }                       
                );
                console.info("Blog found successfully");
                return res.status(200).send({blog, token}); 
            }
            console.warn("Heading incorrect");
            return res.status(401).send("Heading was incorrect");
        })
        .catch((error) => {
            console.error(`Blog with userID: ${userID} doesn't exist!`);
            return res.status(404).send(`Blog with userID: ${userID} doesn't exist!`);
        });
};