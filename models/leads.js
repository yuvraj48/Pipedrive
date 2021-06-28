const mongoose=require("mongoose"); 
const { ObjectId } = mongoose.Schema;

   const schema = new mongoose.Schema(
       {
           contactperson: String, 
           organisation: String,
           titles: String, 
           amount: String, 
           curency:String,
           labels:String,         
          leaduser:{
              type:ObjectId,
              ref:"users"
          },
          leadconversion:[{type:ObjectId,ref:"leads"}],
           phone: Number,            
           email: String, 
       },
       { timestamps: true }
   );

  

   module.exports= mongoose.model("leads", schema);
   
