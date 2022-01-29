const { createProduct, getProduct, getProductById, updateProduct } = require('../controllers/productController');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

const router= require('express').Router();






router.route('/')
    .post([authorize,admin],createProduct)
    .get(getProduct)

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)


    module.exports=router;