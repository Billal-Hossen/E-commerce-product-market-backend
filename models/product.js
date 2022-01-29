const {Schema,model}= require('mongoose');
const Joi = require("joi");
const productSchema= Schema({
    name:  String,
    price: Number,
    description: String,
    quantity: Number,
    cagegory:{
        type : Schema.Types.ObjectId,
        ref: "Category",
        required: true

    },
    photo:{
        type: Buffer,
        contentType: String
    }
})


const productValidate= product=>{
    const schema= Joi.object({
        name: Joi.string().min(3).max(255),
        price:Joi.number().required(),
        description: Joi.string().max(2000).required(),
        quantity: Joi.number().required(),
        category: Joi.string().required()
    })

    return schema.validate(product)
}

module.exports.Product=model('Product',productSchema);
module.exports.validate=productValidate;

