const User = require("../models/user");


exports.getUserById = (req,res,next,id) => {
    User.findById(id)
    .exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No user found in db"
            })
        }
        req.profile=user;
        next();
    });
};


exports.getUser=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile );
}

exports.updateuser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.user_id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"Failed to update"
                });
            }
            user.salt=undefined;
            user.encry_password=undefined;
            res.json(user);
        }
    )
}

exports.trying=(req,res,username)=>{
    
        return User.findOne({ username: username })
          .populate('people').exec((err, posts) => {
            console.log("Populated User " + posts);
          })
      
};
