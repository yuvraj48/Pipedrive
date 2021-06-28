const leads = require("../models/leads");
const Lead = require("../models/leads");



exports.leadgetbyid =(req,res,next,id)=>{
    Lead.findById(id)
    .exec((err,lead)=>{
        if(err){
            return res.status(400).json({
                error:"Not Found"
            })
        }
    
    req.lead=lead
    next();
    }
    )
};


exports.createlead = (req, res) => {
    // Validate request
    const {contactperson,organisation,titles,amount,curency,labels,phone,email}=req.body
    req.profile.salt=undefined;
    req.profile.encry_password=undefined
    

    // Create a Task
    const task = new Lead({
        contactperson ,
        organisation,
        titles,
        amount,
        curency,
        labels,
        leaduser:req.profile,
        phone,
        email
    });

    // Save Task in the database
    task
        .save(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR creating deal"
            });
        });
};

exports.getallleads=(req,res)=>{
    Lead.find({leaduser:req.profile._id})    
   .populate("leaduser","_id name")
   .exec((err,leads)=>{
       if(err){
           return res.status(400).json({
               error:"NOt found"
           })
       }
       res.json(leads);
   })
};

exports.deletelead=(req,res)=>{
    let leads=req.lead
    leads.remove((err,peeps)=>{
        if(err){
            return res.status(400).json({
                error:"failed to delete"
            })
        }
         
        res.json({peeps,message:"deleted successfully"});
    })
};

exports.LeadConversion=(req,res)=>{
   
    leads.findByIdAndUpdate(req.body.leadId,{
        $push:{ leadconversion:req.body.leadId}
    },{
        new:true,
        useFindAndModify:false
    })
    .populate("leadconversion","_id ")
    .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
  };