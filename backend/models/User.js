const { model, Schema } = require("mongoose")

module.exports = model("User",  new Schema({
    email : { 
        type : String, 
        unique : true, 
        required : [true, "Email is Required"] 
    },
    password : { 
        type : String,
        required : [true, "Password is Required"],
        minLength : [5, "Password is too short"]
    }
}))