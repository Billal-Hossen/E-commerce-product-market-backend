require('express-async-errors')
const express = require('express');

const error=require("./middlewares/error");
const app=express();
// build in middleware
require('./middlewares')(app);

// all routers

require('./middlewares/routers')(app)

app.use(error)



module.exports=app;