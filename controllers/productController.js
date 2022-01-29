const {Product , validate} = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs= require('fs');



module.exports.createProduct= async (req, res)=>{
   
    let form = new formidable.IncomingForm();
    
    form.keepExtentions= true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).send("Something went wrong!!");
        }
        
        const {error}= validate(_.pick(fields,["name","description","price","quantity","category"]));
        if(error){
            res.status(400).send(error.details[0].message);
        }
        
        const product= new Product(fields);
        if(files.photo){
            // console.log(files.photo);
            
            // <input type="file" name="photo" />
            fs.readFile(files.photo.path,"utf-8",(err,data)=>{
              
                if(err){
                    return res.status(400).send("problem in file data!")
                }
                // console.log(data);
                product.photo.data=data;
                product.photo.contentType=files.photo.type;
                product.save((err,result)=>{
                    if(err){
                        return res.status(400).send("Internal Server Error!")
                    }
                    else{
                        return res.status(201).send({
                            message: "Product created Successfully",
                            data: _.pick(result,["name","price","description","quantity","category"])

                        })
                    }
                })
            })
        }
        else{
            return res.status(400).send('No image provided!!');
        }
    })


}

module.exports.getProduct= async (req, res)=>{
    const products = await Product.find()
   return res.status(200).send(products)

    
}
module.exports.getProductById= async (req, res)=>{

    
}
module.exports.updateProduct= async (req, res)=>{

    
}