import express from 'express';
import { isAdmin, requireSignIn } from '../MiddleWare/authMiddleware.js';
import { createOrder, CreatePaymentIntent, getAllOrders, getCompletedOrders, getSingleOrder, getSingleUserCompleted, getSingleUserOrders, updateOrderStatus } from '../Controllers/Orders.js';

 const OrderRouter=express.Router();



OrderRouter.post('/create-payment-intent',requireSignIn,CreatePaymentIntent);
OrderRouter.post('/create-order',requireSignIn,createOrder);
OrderRouter.get('/get-all-orders',getAllOrders);
OrderRouter.get('/get-completed-orders',getCompletedOrders)
OrderRouter.get('/get-single-order/:id',getSingleOrder)
OrderRouter.put('/update-order-status/:id',requireSignIn,isAdmin,updateOrderStatus);
OrderRouter.get('/get-user-orders/:userId',getSingleUserOrders)
OrderRouter.get('/get-user-completed-orders/:userId',getSingleUserCompleted)



export const OrderRoute = OrderRouter;











