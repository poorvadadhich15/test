const mongoose = require("mongoose");
//mngoose is class schema types there dataypes which are only present in mongo db,
//or list of objects which is present in mongo db
const User = new mongoose.Schema({
  id:{
    type:mongoose.SchemaTypes.ObjectId,

  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("user", User, "user");