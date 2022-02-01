const { createProduct, getProducts, getProductById, updateProduct, getProductPhoto,filterProducts } = require('../controllers/productController');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

const router= require('express').Router();






router.route('/')
    .post([authorize,admin],createProduct)
    .get(getProducts)

router.route('/:id')
    .get(getProductById)
    .put([authorize,admin],updateProduct);

router.route('/photo/:id')
       .get(getProductPhoto)

router.route('/filter')
        .post(filterProducts)


    module.exports=router;