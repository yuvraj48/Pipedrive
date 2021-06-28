
const Schedule = require("../models/schedule");

exports.getSchedulebyid=(req,res,next,id)=>{
    Schedule.findById(id)
    .exec((err,sched)=>{
        if(err){
            return res.status(400).json({
                error:"Not found"

        })
    }
    req.schedule=sched;
    next();
});
};

exports.getallSchedule=(req,res)=>{
    Schedule.find({scheduleuser:req.profile._id})
    .exec((err,schedule)=>{
        if(err){
            return res.status(400).json({
                error:"Not found"
            });
        }
        res.json(schedule);
    });
};

exports.getSchedule=(req,res)=>{
    Schedule.find({dealdata:req.deal._id})
    .exec((err,schedule)=>{
        if(err){
            return res.status(400).json({
                error:"Not found"
            });
        }
        res.json(schedule);
    });
};

exports.createSchedule=(req,res)=>{
    const {
         contact,
    startdate,
    enddate,
    starttime,
    endtime,
    option,
    notes,
    deal,
    organisation,
    person} =req.body
    const schedule= new Schedule({
        contact,
        startdate,
        enddate,
        starttime,
        endtime,
        option,
        notes,
        deal,
        organisation,
        person,
        scheduleuser:req.profile});
        schedule
        .save(schedule)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR creating Activity"
            });
        });
};

exports.createNewSchedule = (req, res) => {
    // Validate request
    const {person,startdate,enddate,starttime,endtime,option,notes,deal,organisation,contact}=req.body
    req.profile.salt=undefined;
    req.profile.encry_password=undefined
    

    // Create a Task
    const task = new Schedule({
        person,startdate,enddate,starttime,endtime,option,notes,deal,organisation,contact,
        dealdata:req.deal
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
                    err.message || "ERROR creating Activity"
            });
        });
};



exports.updateSchedule=(req,res)=>{
    Schedule.findByIdAndUpdate(
        {_id:req.schedule.id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,schedule)=>{
            if(err){
            return res.status(400).json({
                error:"Failed to update"
            })

        }
        res.json(schedule);
    }

    )
};

exports.deleteSchedule=(req,res)=>{
    let schedules=req.schedule;
    schedules.remove((err,deletesch)=>{
        if(err){
            return res.status(400).json({
                error:"failed to delete"
            });
        }
        
       
        res.json({deletesch,message:"deleted successfully"});
    });
};
