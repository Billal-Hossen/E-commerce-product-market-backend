const {CartItem}=require('../models/cartItem')
const { Profile } = require('../models/profile');

const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;
module.exports.ipn= async (req,res)=>{
  console.log(req.body);
}
module.exports.paymentController= async (req,res)=>{

const userId=req.user._id;

const cartItem= await CartItem.find({user:userId});


const totalAmount=cartItem.map(item=>item.price*item.count).reduce((previous,current)=>previous+current,0);

const totalItem=cartItem.map(item=>item.count).reduce((previous,current)=>previous+current,0);
const tran_id = '_' + Math.random().toString(36).substr(2,9) + ( new Date()).getTime();


const profile= await Profile.findOne({user:userId});

const {phone,address1,address2,city,postcode,state,country}= profile;
    // For live payment set first parameter `false` and for sandbox set it `true`
const payment = new PaymentSession(
    true,
    process.env.SSLCOMMERZ_STORE_ID,
    process.env.SSLCOMMERZ_STORE_PASSWORD
  );

  
  // Set the urls
  payment.setUrls({
    success: "yoursite.com/success", // If payment Succeed
    fail: "yoursite.com/fail", // If payment failed
    cancel: "yoursite.com/cancel", // If user cancel payment
    ipn: "yoursite.com/ipn", // SSLCommerz will send http post request in this link
  });
  
  // Set order details
  payment.setOrderInfo({
    total_amount: totalAmount, // Number field
    currency: "BDT", // Must be three character string
    tran_id: tran_id, // Unique Transaction id
    emi_option: 0, // 1 or 0
    
  });
  
  // Set customer info
  payment.setCusInfo({
    name: req.user.name,
    email: req.user.email,
    add1: address1,
    add2:address2,
    city: city,
    state: state,
    postcode: postcode,
    country: country,
    phone: phone,
    fax: phone,
  });
  
  // Set shipping info
  payment.setShippingInfo({
    method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
    num_item: totalItem,
    name: req.user.name,
    add1: address1,
    add2:address2,
    city: city,
    state: state,
    postcode: postcode,
    country: country,
  });
  
  // Set Product Profile
  payment.setProductInfo({
    product_name: "E-Com Product",
    product_category: "General",
    product_profile: "general",
  });

  const response= await payment.paymentInit();
//   console.log(response);
   return res.status(200).send(response);


}