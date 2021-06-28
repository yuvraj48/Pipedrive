const mongoose=require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    label:{
        type:String,
        trim:true
    },
    Owner:{
        type:String,
        trim:true
    },
    Adress:{
        type:String,
        trim:true
    }
})
module.exports=mongoose.model("organizations",OrganizationSchema);