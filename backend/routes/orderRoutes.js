import express from 'express';
import {
  addOrderItems,
  createOrder,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  addOrderNumber,
} from '../controllers/orderController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import { updateStock } from '../controllers/productController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, restrictTo('admin'), getOrders)
  .post(protect, addOrderItems, addOrderNumber, updateStock, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router
  .route('/:id/deliver')
  .put(protect, restrictTo('admin'), updateOrderToDelivered);

export default router;
