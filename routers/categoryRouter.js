const router= require('express').Router();
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const { createCategory, getCategories } = require('../controllers/categoryController');


router.route('/')
    .post([authorize,admin],createCategory)
    .get(getCategories);



module.exports=router;