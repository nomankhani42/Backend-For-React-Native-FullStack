import { UserModel } from "../Models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { Product_Model } from "../Models/Product.js";

const User=UserModel;



export const newUser=async (req,res)=>{

    try {
        const {name,userName,country,password}=req.body;
        if(!name){
            return res.json({
                success:false,
                message:'Name is Required'
            })
        }
        if(!userName){
            return res.json({
                success:false,
                message:'UserName is Required'
            })
        }
        if(!country){
            return res.json({
                success:false,
                message:'Country is Required'
            })
        }
      
        if(!password){
            return res.json({
                success:false,
                message:'password is Required'
            })
        }

        const existUser=await User.findOne({userName});
        if(existUser){
            return res.json({
                success:false,
                
                message:'User is already registered please Login'
            });

          
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=await new User({
            name,userName,country, password:hashedPassword
        });

          await newUser.save();
          return  res.json({success:true,
            message:'User Created',
            newUser
           

        })
    } 
    catch (error) {
        console.log(error)
    }
}

export const loginUser=async (req,res)=>{
    try {
         
         const {userName,password}=req.body;
         if(!userName || !password){
            return res.json({
                success:false,
                message:'Invalid Email or Password'
             })
         }

         const user=await User.findOne({userName});
         if(!user){
            return res.json({
                success:false,
                message:'User Not Registered'
            })
         }

         const matchPassword=await bcrypt.compare(password,user.password);
         if(!matchPassword){
            return res.json({
                success:false,
                message:'Password Doesnt Correct Enter Valid Password'
            })
         }
         const token =jwt.sign({_id:user._id},'process.env.JWT_Secret');
         return res.json({
            success:true,
            message:'Login Successfully',
           user:{
            _id:user._id,
            name:user.name,
            userName:user.userName,
            country:user.country,
            role:user.role,
            photo:user.photo
           },
           token
         })

    }
     catch (error) {
        console.log(error)
    }
}
export const updateUser=async(req,res)=>{
    try {
          const id=req.params.id;
          const {name,userName,country,photo}=req.body;

          const existuser=await UserModel.findById(id);
          if(!existuser){
            return res.json({
                success:false,
                message:'user not Found Please Registered First'
            })
          }

       const user=await UserModel.findByIdAndUpdate(id,{name,userName,country,photo},{new:true});

       user.save();

       return res.json({
        success:true,
        message:'User Updated Successfully',
        user:{
            _id:user._id,
            name:user.name,
            userName:user.userName,
            country:user.country,
            role:user.role,
            photo:user.photo
           },
       })
    } 
    catch (error) {
           res.json({
            success:false,
            message:'error in updating User details'
           })
    }
}
 export const authController=async(req,res)=>{

    const user=await User.findOne({_id:req.user._id})
    
    return res.json({
      success:true,
      user,
      message:'Protected Route',
      
    })
  }