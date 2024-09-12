import express from 'express';
import { createProductController, deleteProduct, filterProductsbyCategory, getAllProductController, getSingleProductController, getSingleProductPhotoController, searchFilterController, updateProductController } from '../Controllers/Product.js';
import { isAdmin, requireSignIn } from '../MiddleWare/authMiddleware.js';

// import { isAdmin, requireSignIn } from '../MiddleWare/authMiddleware.js';


const ProductRouter = express.Router();


ProductRouter.post('/create-product', requireSignIn, isAdmin, createProductController);
ProductRouter.get('/get-products', getAllProductController)
ProductRouter.get('/get-product/:slug', getSingleProductController)
ProductRouter.get('/get-Photo/:id', getSingleProductPhotoController);
ProductRouter.get('/get-Photo/:id', getSingleProductPhotoController);
ProductRouter.get('/get-products-by-category/:id',filterProductsbyCategory)
ProductRouter.get('/get-products-by-search/:keyword',searchFilterController)
ProductRouter.put('/update-product/:id', requireSignIn, isAdmin, updateProductController);
ProductRouter.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProduct);





export const ProductRoute = ProductRouter;