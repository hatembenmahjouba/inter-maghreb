import express from 'express';
import productRoutes from './productRoutes.js';
import userRouter from './userRoutes.js';
import orderRouter from './orderRoutes.js';
import reviewRouter from './reviewRoutes.js';
import uploadRouter from './uploadRoutes.js';
import categoryRouter from './categoryRoutes.js';
import subCategoryRouter from './subCategoryRoutes.js';
const api = express.Router();
api.use('/products', productRoutes);
api.use('/users', userRouter);
api.use('/orders', orderRouter);
api.use('/reviews', reviewRouter);
api.use('/categories', categoryRouter);
api.use('/subcategories', subCategoryRouter);
api.use('/uploads', uploadRouter);

export default api;
