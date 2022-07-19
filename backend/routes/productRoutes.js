import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  aliasTopProducts,
  aliasNewProducts,
} from '../controllers/productController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

router.route('/top-5-products').get(aliasTopProducts, getProducts);
router.route('/new-5-products').get(aliasNewProducts, getProducts);

router
  .route('/')
  .get(getProducts)
  .post(protect, restrictTo('admin'), createProduct);

router
  .route('/:slug')
  .get(getProductBySlug)
  .patch(protect, restrictTo('admin'), updateProduct)
  .delete(protect, restrictTo('admin'), deleteProduct);

export default router;
