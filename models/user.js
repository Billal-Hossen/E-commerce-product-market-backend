const {Schema,model} = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');



const UserSchema=Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
    },
    email:{
        type:String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        minlength: 5,
        maxlength: 1024,
        requird: true
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
}, { timestamps: true })

UserSchema.methods.generateJWT=function (){
    const token=jwt.sign({
        _id:this._id,
        name: this.name,
        email: this.email,
        role: this.role,


    }, process.env.JWT_SECRET_KEY,{ expiresIn: "7d" });
    return token;
}

const validateUser= user =>{

    const schema=Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user);

}

module.exports.User=model('User',UserSchema);
module.exports.validate=validateUser;