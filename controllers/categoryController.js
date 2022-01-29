const {Category,validate} = require('../models/category');
const _ = require('lodash');

module.exports.createCategory= async (req,res)=>{
    const {error}=validate(_.pick(req.body,['name']));
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    let category= await Category.findOne(_.pick(req.body,["name"]));
    if(category){
      return  res.status(400).send('Category already created');
    }

    category = new Category(_.pick(req.body,["name"]));

    const result = await category.save();
    return res.status(201).send({
        message: "Category Created Successfully",
        data:{
            name:result.name}
    });

}


module.exports.getCategories= async (req,res)=>{
    const categories = await Category.find().select({_id:1, name: 1}).sort({name:1})
    if(!categories){
        return res.status(400).send("This category is not there!");

    }

   return res.status(200).send(categories)
    

}