require('dotenv/config');
const app=require('./app');
const mongoose=require("mongoose");


const DB=process.env.MONGODB_SERVER.replace('<PASSWORD>',process.env.DB_PASS)
mongoose.connect(DB) 
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log("MongoDB Connecton Failed!!"));
 const port=process.env.PORT | 3005;

 
app.listen(port, ()=>console.log(`Listing on port ${port}.....`));


