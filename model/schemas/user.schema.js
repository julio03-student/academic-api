/** packages */

const mongoose = require("mongoose")
const validator = require("mongoose-unique-validator")

/** Schema Creation */

const userSchema = new mongoose.Schema({
    
    name:{
        type: "String",
        required: true
    },
    lastname:{
        type: "String",
        required: true
    },
    username:{
        type: "String",
        require: true,
        unique: true
    },
    password:{
        type: "String",
        required: true
    },
    rol:{
        type: "Number", 
        required: true
    }
})

/** Schema Exportation */
userSchema.plugin(validator)
module.exports = userSchema