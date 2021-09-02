/** packages */

const mongoose = require("mongoose")

/** Schema Creation */

const courseSchema = new mongoose.Schema({
    code:{
        type: "String",
        required: true,
        unique: true,
    },
    name:{
        type: "String",
        required: true,
        unique: true,
    }
})

module.exports = courseSchema