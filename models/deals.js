 const mongoose=require("mongoose"); 
 const { ObjectId } = mongoose.Schema;
    const schema = new mongoose.Schema(
        {
            person: String, 
            type: String, 
            organization: String,
            title: String, 
            value: String, 
            currency:String,
            enddate:String,
            dealuser: {
                type: ObjectId,
                ref: "users"
             },
             subscriptions:[{
                amount:Number,    
                description:String,  
                inter:String,
                totalpayment:Number,
                startingdate:String,        
                postedBy:{type:ObjectId,ref:"users"}
              
            }],  
            Win:[{type:ObjectId,ref:"deals"}],
           Lose:[{type:ObjectId,ref:"deals"}],
           schedule:{
               type:ObjectId,
               ref:"schedules"
           },

            phone: Number,            
            email: String, 
        },
        { timestamps: true }
    );

   

    module.exports= mongoose.model("deals", schema);
    
