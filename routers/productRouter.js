const { createProduct, getProduct, getProductById, updateProduct } = require('../controllers/productController');

const router= require('express').Router();






router.route('/')
    .post(createProduct)
    .get(getProduct)

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)


    module.exports=router;