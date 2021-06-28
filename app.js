
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const  cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {MONGO_URI} = require('./config/dev');

//routes
const authRoutes = require("./routes/auth");
const mailRoutes = require("./routes/mail");
const userRoutes = require("./routes/user");
const ScheduleRoutes=require("./routes/schedule");
const PersonRoutes=require("./routes/people");
const organisationRoutes = require("./routes/organisation")
const productRoutes = require("./routes/product")
const dealRoutes = require("./routes/deal");
const leadRoutes = require("./routes/leads");

//database connection
mongoose
.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
})
.then(() => {
    console.log("DB CONNECTED");
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
 
app.use( authRoutes);
app.use(mailRoutes);
app.use( userRoutes);
app.use(ScheduleRoutes);
app.use(PersonRoutes);
app.use(productRoutes);
app.use(organisationRoutes);
app.use(dealRoutes);
app.use(leadRoutes);

const port = process.env.PORT || 8000;

if(process.env.NODE_ENV=="production"){
  app.use(express.static('frontened/build'))
  const path =require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontened','build','index.html'))
  })
}

app.listen(port,()=>{
    console.log(`app is running at ${port}`);
  });