const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const personSchema = mongoose.Schema({
    Name:{
        type:String,
        trim:true,
        required:true
    },
    Organisation:{
        type:String,
        trim:true
    },
    label:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    owner: {
        type: ObjectId,
        ref: "users"
     },
   

});
module.exports=mongoose.model("peoples",personSchema);