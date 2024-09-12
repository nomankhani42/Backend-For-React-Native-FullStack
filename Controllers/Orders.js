
import { OrderModel } from "../Models/Order.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PlqUxBdG0truyJNzu7ra5ysG0KMEs3FMytB0STu1jtJIU0qftkp4211y3lVEqYF6c8Z79rBScZgMU5rs1PiTVkH00EBRPUzdi'); 


export const CreatePaymentIntent=async(req,res)=>{
   const { amount } = req.body;

   try {
     const paymentIntent = await stripe.paymentIntents.create({
       amount,
       currency: 'usd',
       automatic_payment_methods: {
        enabled: true,
      }
     });

    return res.json({ clientSecret: paymentIntent.client_secret });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
}

export const createOrder=async(req,res)=>{
  try {
       const {name,phone,address,userName,amount,products,quantity,userId}=req.body;

       const NewOrder=await new OrderModel({name,phone,address,userName,userId,amount,quantity,payment:"Success",products});
       NewOrder.save();

       return res.json({
        success:true,
        message:"Order Placed Successfully",
        NewOrder
       })
  } 
  catch (error) {
    console.log(error)
  }
}

export const getAllOrders=async(req,res)=>{
  try {
    const response = await OrderModel.find({ orderStatus: { $ne: 'delivered' } });
      return res.json({
        success:true,
        message:'Order Getted Successfully',
        response
      })
  } 
  catch (error) {
    console.log(error)
  }
}

export const getCompletedOrders=async(req,res)=>{
  try {
    const response = await OrderModel.find({ orderStatus:'delivered'});
      return res.json({
        success:true,
        message:'Order Getted Successfully',
        response
      })
  } 
  catch (error) {
    console.log(error)
  }
}

export const getSingleOrder=async(req,res)=>{
    const singleOrder=await OrderModel.findById(req.params.id);

    return res.json({
      success:true,
      message:'Single Ordered Fetched',
      singleOrder

    })
}
export const updateOrderStatus=async(req,res)=>{
  const {orderStatus}=req.body;
  try {
      const response=await OrderModel.findByIdAndUpdate(req.params.id,{orderStatus},{new:true});

      return res.json({
        success:true,
        message:'Order Status Updated Successfully',
        response
      })
  }
   
  catch (error) {
    console.log(error)
  }
}


export const getSingleUserOrders=async(req,res)=>{
  try {
        const userOrders=await OrderModel.find({userId:req.params.userId,orderStatus:{$ne:'delivered'}});

        return res.json({
          success:true,
          message:'User Order Fetched Successfully',
          userOrders
        })
  } 
  catch (error) {
    console.log(error)
  }
}

export const getSingleUserCompleted=async(req,res)=>{
  try {
    const userOrders = await OrderModel.find({
      userId: req.params.userId,
      orderStatus: 'delivered'
    });
          return res.json({
            success:true,
            message:'User Completed Order Fetched Successfully',
            userOrders
          })
  } 
  catch (error) {
    console.log(error)
  }
}