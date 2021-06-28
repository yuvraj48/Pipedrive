
const product =require("../models/product");

exports.productgetbyid =(req,res,next,id)=>{
    product.findById(id)
    .exec((err,Product)=>{
        if(err){
            return res.status(400).json({
                error:"Not Found"
            })
        }
    
    req.product=Product
    next();
    }
    )
}

exports.createProduct=(req,res)=>{
    const {ProductName,
    ProductCode,
    Category,
    Unit,
    UnitPrice,
    Tax,
    }= req.body
    req.profile.salt=undefined;
    req.profile.encry_password=undefined

    const peeps=new product({
    ProductName,
    ProductCode,
    Category,
    Unit,
    UnitPrice,
    Tax,
    productuser:req.profile
    })
    peeps
        .save(peeps)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR creating Product"
            });
        });
};

exports.getallproduct=(req,res)=>{
    product.find({productuser:req.profile._id})
    .populate("productuser","name")
    .exec((err,Product)=>{
        if(err){
            return res.status(400).json({
                error:"NOt found"
            })
        }
        res.json(Product);
    })
};

exports.updateProduct=(req,res)=>{
    product.findByIdAndUpdate(
        {_id:req.product._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,Product)=>{
            if(err){
            return res.status(400).json({
                error:"Failed to update"
            })

        }
        res.json(Product);
    }

    )
};

exports.deleteProduct=(req,res)=>{
    let p=req.product
    p.remove((err,Product)=>{
        if(err){
            return res.status(400).json({
                error:"failed to delete"
            })
        }
         
        res.json({Product,message:"deleted successfully"});
    })
};
