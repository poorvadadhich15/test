const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
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
    },

});

module.exports = mongoose.model("admin", Admin, "admin");