require('express-async-errors')
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter=require('./routers/userRouter');
const categoryRouter= require('./routers/categoryRouter.js')
const error=require("./middlewares/error");


const app=express();

//.........build in middleware.........

app.use(bodyParser.json());
app.use(cors());
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}

app.use('/api/user',userRouter);
app.use('/api/category',categoryRouter);

app.use(error)



module.exports=app;