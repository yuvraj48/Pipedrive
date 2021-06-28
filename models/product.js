const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema({
    ProductName:{
        type:String,
        trim:true,
        required:true
    },
    ProductCode:{
        type:String,
        trim:true
    },
    Category:{
        type:String,
        trim:true
    },
    Unit:{
        type:String,
        trim:true
    },
    UnitPrice:{
        type:String,
        trim:true
    },
    Tax:{
        type:String,
        trim:true
    },
    productuser: {
        type: ObjectId,
        ref: "users"
     },

});
module.exports=mongoose.model("products",productSchema);