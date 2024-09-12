
import  Mongoose,{Schema } from 'mongoose';


const categorySchema=new Schema({
    category:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String
    }
    // ,
    // slug:{
    //     type:String,
    //     required:true
    // }
})

export const  CategoryModel= Mongoose.model('categories',categorySchema)