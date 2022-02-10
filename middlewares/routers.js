const userRouter=require('../routers/userRouter');
const categoryRouter= require('../routers/categoryRouter.js');
const productRouter= require('../routers/productRouter');
const CartRouter =require("../routers/CartRouter");
const profileRouter= require('../routers/profileRouter');
const paymentRouter= require('../routers/paymentRouter');


module.exports=app=>{
    app.use('/api/user',userRouter);
    app.use('/api/category',categoryRouter);
    app.use('/api/product',productRouter);
    app.use('/api/cart',CartRouter);
    app.use('/api/profile',profileRouter);
    app.use('/api/payment',paymentRouter)


}