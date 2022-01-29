const {Schema,model}=require('mongoose');
const Joi=require('joi');

const categorySchema= Schema({
    name:{
        type:String,
        unique: true
    }
},{ timestamps: true })

const categoryvalidate= category=>{
    const schema= Joi.object({
        name: Joi.string().min(3).max(50).required()
    })

    return schema.validate(category);
}

module.exports.Category=model('Category',categorySchema);
module.exports.validate=categoryvalidate;