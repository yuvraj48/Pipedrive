
const Deal = require("../models/deals");

exports.dealgetbyid =(req,res,next,id)=>{
    Deal.findById(id)
    .populate("user","_id")
    .exec((err,deal)=>{
        if(err){
            return res.status(400).json({
                error:"Not Found"
            })
        }
    
    req.deal=deal
    next();
    }
    )
};



exports.createdeal = (req, res) => {
    // Validate request
    const {person,organization,type,title,value,currency,phone,email,enddate}=req.body
    req.profile.salt=undefined;
    req.profile.encry_password=undefined
    

    // Create a Task
    const task = new Deal({
        person ,
        type, 
        organization,
        title,
        value,
        currency,
        dealuser:req.profile,
        phone,
        email,
        enddate
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



exports.getdeal=(req,res)=>{
  Deal.find({_id:req.deal._id,dealuser:req.profile._id})
.populate("dealuser","_id name email ")
  
  .exec((err,mydeal)=>{
      if(err){
          return res.status(400).json({
              error:"NOt found"
          })
      }
      res.json(mydeal);
  })
};

exports.getallpost=(req,res)=>{
     Deal.find({dealuser:req.profile._id})    
    .populate("dealuser","_id name")
    .exec((err,instapost)=>{
        if(err){
            return res.status(400).json({
                error:"NOt found"
            })
        }
        res.json(instapost);
    })
};
exports.findMeetingArranged = (req, res) => {
    Deal.find({dealuser:req.profile._id,  type: 'Meeting Arranged' })
    .populate("dealuser","_id name")
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "ERROR retrieving tasks."
        });
      });
  };
  
  // find all in progress
  exports.findAllContactMade = (req, res) => {
    Deal.find({dealuser:req.profile._id,  type: 'Contact Made' })
    .populate("dealuser","_id name")
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "ERROR retrieving tasks."
        });
      });
  };
  
  // find all done
  exports.findNeedsDefined = (req, res) => {
    Deal.find({dealuser:req.profile._id,  type: 'Needs Defined' })
    .populate("dealuser","_id name")
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "ERROR retrieving tasks."
        });
      });
  };

  exports.findProposalMade = (req, res) => {
    Deal.find({dealuser:req.profile._id,  type: 'Proposal Made' })
    .populate("dealuser","_id name")
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "ERROR retrieving tasks."
        });
      });
  };

  exports.findNegotiationStarted = (req, res) => {
    Deal.find({dealuser:req.profile._id,  type: 'Negotiation Started' })
    .populate("dealuser","_id name")
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "ERROR retrieving tasks."
        });
      });
  };

  exports.findQualified = (req, res) => {
    Deal.find({dealuser:req.profile._id, type: 'Qualified',type:"" })
    .populate("dealuser","_id name")
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "ERROR retrieving tasks."
        });
      });
  };

  exports.searchdeal=(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    Deal.find({title:{$regex:userPattern,$options:'$i'}})
    
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
};


exports.getSubscription=(req,res)=>{
  const subscription = {
      amount:req.body.amount,
      inter:req.body.inter,
      totalpayment:req.body.totalpayment,
      description:req.body.description,
      startingdate:req.body.startingdate,
      postedBy:req.profile._id
  }
  Deal.findByIdAndUpdate(req.body.dealId,{
      $push:{subscriptions:subscription}
  },{
      new:true
  })
  .populate("dealuser","_id name")
  .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
};
exports.paymentSchedule=(req,res)=>{
  const subscription = {
      amount:req.body.amount,
      postedBy:req.profile._id
  }
  Deal.findByIdAndUpdate(req.body.dealId,{
      $push:{subscriptions:subscription}
  },{
      new:true
  })
  .populate("postedBy","_id name")
  .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
};


exports.Windeal=(req,res)=>{
  Deal.findByIdAndUpdate(req.body.dealId,{
      $push:{Win:req.deal._id}
  },{
      new:true,
      useFindAndModify:false
  })
  .populate("dealuser","_id name")
  .exec((err,result)=>{
    if(err){
        return res.status(422).json({error:err})
    }else{
        res.json(result)
    }
})
};

exports.Losedeal=(req,res)=>{
  Deal.findByIdAndUpdate(req.body.dealId,{
      $push:{Lose:req.deal._id}
  },{
      new:true,
      useFindAndModify:false
  })  .exec((err,result)=>{
    if(err){
        return res.status(422).json({error:err})
    }else{
        res.json(result)
    }
})
};