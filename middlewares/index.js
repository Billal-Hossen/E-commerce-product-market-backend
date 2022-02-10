
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const compression= require('compression');
const express = require('express');

module.exports=app=>{
    //.........build in middleware.........

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(compression());
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}
}