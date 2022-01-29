require('dotenv/config');
const app=require('./app');
const mongoose=require("mongoose");

mongoose.connect(process.env.MONGODB_URL_LOCAL)
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log("MongoDB Connecton Failed!!"));
 const port=process.env.PORT || 3005;

 
app.listen(port, ()=>console.log(`Listing on port ${port}.....`));


