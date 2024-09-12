import mongoose from "mongoose";


const ProductSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
    required:true,
    type:mongoose.ObjectId,
    ref:'categories'
    },
    photo:{
      type:String
    },
    
},{timestamps: true})

export const Product_Model= mongoose.model('Product',ProductSchema);