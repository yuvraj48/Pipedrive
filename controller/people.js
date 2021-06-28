
const person =require("../models/people");
const getUserById = require("../controller/user");


exports.persongetbyid =(req,res,next,id)=>{
    person.findById(id)
    .exec((err,people)=>{
        if(err){
            return res.status(400).json({
                error:"Not Found"
            })
        }
    
    req.person=people
    next();
    }
    )
}

exports.createPerson=(req,res)=>{
    const {Name,Organisation,label,phone,email}=req.body
    req.profile.salt=undefined;
    req.profile.encry_password=undefined
    req.profile.schedule=undefined
    req.profile.products=undefined
    req.profile.peoples=undefined
    
    const peeps = new person({
        Name,
        Organisation,
        label,
        phone,
        email,
        owner:req.profile

    })
    peeps.save((err,people)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save"
            })
        }
        res.json({people})
    })
};
exports.getpeople=(req,res)=>{
    person.find({owner:req.profile._id})
    .populate("owner","_id name")
    .exec((err,people)=>{
        if(err){
            return res.status(400).json({
                error:"NOt found"
            })
        }
        res.json(people);
    })
}

exports.getallpeople=(req,res)=>{
    person.find()
    .populate("owner","_id name")
    .exec((err,people)=>{
        if(err){
            return res.status(400).json({
                error:"NOt found"
            })
        }
        res.json(people);
    })
};

exports.updatePeople=(req,res)=>{
    person.findByIdAndUpdate(
        {_id:req.person._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,people)=>{
            if(err){
            return res.status(400).json({
                error:"Failed to update"
            })

        }
        res.json(people);
    }

    )
};

exports.deletePerson=(req,res)=>{
    let people=req.person
    people.remove((err,peeps)=>{
        if(err){
            return res.status(400).json({
                error:"failed to delete"
            })
        }
         
        res.json({peeps,message:"deleted successfully"});
    })
};
