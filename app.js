import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Route } from './Routes/user.js';
import { CatRoute } from './Routes/Category.js';
import dotenv from 'dotenv';
import { ProductRoute } from './Routes/Product.js';
import { OrderRoute } from './Routes/Order.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.mongo_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection error:', err);
  }
}

main();

// Routes
app.use('/api', Route);
app.use('/api/category', CatRoute);
app.use('/api/products', ProductRoute);
app.use('/api/orders', OrderRoute);
app.use('*', (req, res) => {
  res.send('Hello My API is Running');
});

// Start the server
app.listen(8080, () => {
  console.log('App Running');
});
