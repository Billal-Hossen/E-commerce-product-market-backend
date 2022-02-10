
const { paymentController, ipn } = require("../controllers/paymentController");
const authorize= require("../middlewares/authorize")
const router= require('express').Router();



router.route('/')
.get(authorize,paymentController)


router.route('/')
.post(ipn)


module.exports=router;