const { model, Schema, SchemaTypes } = require("mongoose")

module.exports = model("Todo", new Schema({
    userID : {
        type : SchemaTypes.ObjectId,
        required : [true, "ObjectId is Required"] 
    },
    text : {
        type : String,
        required : [true, "Text is Required"] 
    },
    isComplete : {
        type : Boolean,
        required : [true, "isComplete is Required"] 
    }
}))