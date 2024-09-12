import mongoose, { Schema, model } from "mongoose";


const orderSchema=new Schema({
    name:String,
    phone:Number,
    products:[{
       title:String,
        price:Number,
        quantity:Number,
        photo:String

    }],
    amount:Number,
    address:String,
    userId:mongoose.ObjectId,
    payment:String,
    quantity:Number,
    orderStatus:{type:String,default:"Pending"}
});

export const OrderModel=model('orders',orderSchema);