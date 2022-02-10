const { validate, User } = require("../models/user");
const _ =require('lodash');
const bcrypt= require('bcrypt');

module.exports.signUp= async (req,res)=>{
    console.log("gedhhdhiu");
    const {error}=validate(req.body);
    if(error){
      return  res.status(400).send(error.details[0].message)
    }

    let user={};
    user= await User.findOne({email: req.body.email})
    if(user){
      return  res.status(400).send('User already registed');
    }
    user= new User(_.pick(req.body,['name','email','password']));

    const salt= await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password,salt);

    const token= user.generateJWT();
  


        const result= await user.save();
      return  res.status(201).send({
            message:"Registation Successful",
            token:token,
            user:_.pick(result,["_id","name","email"])

        })
         
     


}

module.exports.signIn= async (req,res)=>{
    let user= await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send("Invalied email or password")
    }

   

    const validUser=await bcrypt.compare(req.body.password, user.password);
    if(!validUser){
        return res.status(400).send("Invalied email or password")
    }

    const token= user.generateJWT();

    return res.status(200).send({
        message:"User Successfully LoggIn",
        token:token,
        user: _.pick(user,["_id","name","email"])
    })

}