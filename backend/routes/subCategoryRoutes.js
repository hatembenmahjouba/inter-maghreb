import express from 'express';
import {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getProductsBySubCategory,
} from '../controllers/subCategoryController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(getSubCategories)
  .post(protect, restrictTo('admin'), createSubCategory);

router
  .route('/:slug')
  .get(getSubCategory)
  .patch(protect, restrictTo('admin'), updateSubCategory)
  .delete(protect, restrictTo('admin'), deleteSubCategory);

router.route('/:slug/products').get(getProductsBySubCategory);

export default router;
