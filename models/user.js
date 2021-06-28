var mongoose = require("mongoose");
var crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema;

var UserSchema = new mongoose.Schema(
{
    name : {
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    companyname:{
        type:String,
        trim:true,     
        
    },
    companysize:{
        type:String,
        trim:true
    },
    companytype:{
        type:String,
        trim:true
    },
    phone:{
        type:Number,
        maxlength:10,
        unique:true
    },

    role: {
        type: Number,
        default: 0
      },
    encry_password:{
        type:String,
        required:true

    },
    
   
    salt:String,

    userinfo:{ 
        type:String,
        trim:true

    }
}
);
UserSchema
  .virtual("password")
  .set(function(password) {    
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securepassword(password);
  })
  .get(function() {
    return this._password;
  });
UserSchema.methods={
autheticate:function(plainpassword){
    return this.encry_password === this.securepassword(plainpassword);

},
securepassword:function (plainpassword){
    if(!plainpassword) return "";
    try{
        return crypto
        .createHmac("sha256",this.salt)
        .update(plainpassword)
        .digest("hex");
        }catch(err){
            return ""

        }

}
}
module.exports=mongoose.model("users",UserSchema);