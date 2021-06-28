const organization =require("../models/organization");


exports.organizationbyid=(req,res,next,id)=>{
    organization.findById(id)
    .exec((err,organisation)=>{
        if(err){
            return res.status(400).json({
                error:"Not Found"
            })
        }
        req.organization=organisation
        next();
    })
    

};

exports.createorganisation=(req,res)=>{
    const organisation= new organization(req.body)
    organisation.save((err,organiZations)=>{

        if(err){
            return res.status(400).json({
                error:"NOt able to save"
            })
        }
        res.json({organiZations})
    })
};

exports.getorganisation=(req,res)=>{
    organization.find()
    .exec((err,organisation)=>{
        if(err){
            return res.status(400).json({
                error:"Not found"
            });
        }
        res.json(organisation);
    });
};



exports.deleteorganisation=(req,res)=>{
    let organiZation =req.organization
    organiZation.remove((err,organiZations)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to delete"
            })
        }
        res.json({organiZations,message:"deleted successfully"});

    })
    
};

exports.updateorganisation=(req,res)=>{
    organization.findByIdAndUpdate(
        {_id:req.organization.id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,organiZations)=>{
            if(err){
            return res.status(400).json({
                error:"Failed to update"
            })

        }
        res.json(organiZations);
    }

    )
};