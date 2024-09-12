import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Route } from './Routes/user.js';
import { CatRoute } from './Routes/Category.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { ProductRoute } from './Routes/Product.js';
import { OrderRoute } from './Routes/Order.js';


dotenv.config();



const app=express();

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())


main().then(()=>console.log('DB connected')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongo_Url);
  
}

app.use('/api',Route)
app.use('/api/category',CatRoute)
app.use('/api/products',ProductRoute)
app.use('/api/orders',OrderRoute)
app.use('*',(req,res)=>{
  return res.send('Hello My Api is Runnig')
})


app.listen(8080,()=>{
    console.log('App Running');
})
