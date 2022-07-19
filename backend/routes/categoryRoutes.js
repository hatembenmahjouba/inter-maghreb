import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubCategoriesByCategory,
  getProductsSubCategory,
  getProductsByCategory,
} from '../controllers/categoryController.js';
import { protect, restrictTo } from '../controllers/authController.js';
const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(protect, restrictTo('admin'), createCategory);

router
  .route('/:slug')
  .get(getCategory)
  .patch(protect, restrictTo('admin'), updateCategory)
  .delete(protect, restrictTo('admin'), deleteCategory);

router.route('/:id/subcategories').get(getSubCategoriesByCategory);
router
  .route('/:slug/subcategories/:subSlug/products')
  .get(getProductsSubCategory);
router.route('/:slug/products').get(getProductsByCategory);

export default router;
