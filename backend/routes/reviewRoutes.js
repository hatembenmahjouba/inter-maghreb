import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  createReview,
  getAllReviews,
  deleteReview,
  setProductUserIds,
  getReview,
  getMyReviews,
  deleteMyReview,
  updateMyReview,
} from '../controllers/reviewController.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setProductUserIds, createReview);

router.route('/myreviews').get(getMyReviews);
router.route('/myreviews/:id').patch(updateMyReview).delete(deleteMyReview);
router.route('/:id').get(getReview).delete(restrictTo('admin'), deleteReview);

export default router;
