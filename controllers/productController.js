const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { Product, validate } = require('../models/product');

module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send("Something went wrong!");
        const { error } = validate(_.pick(fields, ["name", "description", "price", "category", "quantity"]));
        if (error) return res.status(400).send(error.details[0].message);

        const product = new Product(fields);

        if (files.photo) {
            // <input type="file" name="photo" />
            fs.readFile(files.photo.filepath, (err, data) => {
                if (err) return res.status(400).send("Problem in file data!");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;
                product.save((err, result) => {
                    if (err) res.status(500).send("Internal Server error!");
                    else return res.status(201).send({
                        message: "Product Created Successfully!",
                        data: _.pick(result, ["name", "description", "price", "category", "quantity","photo"])
                    })
                })
            })
        } else {
            return res.status(400).send("No image provided!");
        }
    })
}

// Query String
// api/product?order=desc&sortBy=name&limit=10
module.exports.getProducts = async (req, res) => {
    let order = req.query.order === 'desc' ? -1 : 1;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const products = await Product.find()
        .select({ photo: 0 })
        .sort({ [sortBy]: order })
        .limit(limit)
        .populate('category', 'name');
    return res.status(200).send(products);
}

module.exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
        .select({ photo: 0 })
        .populate('category', 'name');
    if (!product) res.status(404).send("Not Found!");
    return res.status(200).send(product);
}

module.exports.getProductPhoto = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
        .select({ photo: 1, _id: 0 })
    res.set('Content-Type', product.photo.contentType);
    return res.status(200).send(product.photo.data);
}

module.exports.updateProduct = async (req, res) => {
    const productId= req.params.id;
    const product= await Product.findById(productId);

    let form= new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fiels,files)=>{
        if(err) return res.status(404).send("Not Found!");
       const updatedProduct = _.pick(fiels,['name','price','description','quantity','category']);
       _.assignIn(product,updatedProduct);

       if(files.photo){
           fs.readFile(files.photo.filepath,(err,data)=>{
               if(err) return res.status(400).send("Something wrong!!");
               product.photo.data=data;
               product.photo.contentType=files.photo.type;
               product.save((err,result)=>{
                   if(err) return res.status(400).send("Something Missing");
                   else return res.status(200).send({
                       message:"Product updated Successfully"
                   })
               })
           })
       }
       else{
        product.save((err,result)=>{
            if(err) return res.status(400).send("Something Missing");
            else return res.status(200).send({
                message:"Product updated Successfully"
            })
        })
       }

    })

}
const body={
    order:"desc",
    sortBy:"price",
    limit:6,
    skip:10,
    filters:{
        price:[1000,2000],
        category:['13kxjccjj','3827948947dkjfjfjf']
    }

}

module.exports.filterProducts= async (req,res)=>{
    let order= req.body.order ==="desc"? 1: -1;
    let sortBy= req.body.sortBy? req.body.sortBy: "_id";
    let limit= req.body.limit? parseInt(req.body.limit): 10;
    let skip= parseInt(req.body.skip);
    let filters=req.body.filters;
    let arg ={}

    for (const key in filters) {
        if(filters[key].length > 0){
            if(key==="price"){
                // {price:{$gte:0, $lte:100}}
                arg['price']={
                    $gte:filters['price'][0],
                    $lte:filters['price'][1]
                }
                // console.log(arg);

            }
        
            if(key==="category"){
                    // ctegory: $in:['']
                arg['category']={
                    $in: filters["category"]
                }
                // console.log(arg);

            }
        }
       
    }
 
    const products= await Product.find(arg)
                        .select({photo:0})
                        .populate("category","name")
                        .sort({[sortBy]:order})
                        .limit(limit)
                        .skip(skip)

     res.status(200).send(products)
}

