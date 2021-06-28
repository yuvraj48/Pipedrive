const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Scheduleschema =new mongoose.Schema({

    person:{
        type:String,
        trim:true
    },

    startdate:{
        type:String,
        
        trim:true
    },
    enddate:{
        type:String,
        
        trim:true
    },
    starttime:{
        type:String,
        trim:true
    },
    endtime:{
        type:String,
        trim:true
    },
    option:{
        type:String,  
        trim:true
    },
    notes:{
        type:String,   
        trim:true
    },

    deal:{
         type:String,
         trim:true
        },

    organisation:{
        type:String,
        required:true,
        trim:true
    },
    contact:{
        type:Number,
        required:true,
        trim:true
    },
    dealdata:{
        type:ObjectId,
        ref:"deals"
    },

    scheduleuser:{
        type:ObjectId,
        ref:"users"
    }
 
},
{ timestamps: true }
)
module.exports=mongoose.model("schedules",Scheduleschema);