import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  uploadImageForUser,
  uploadImageForProduct,
  resizePhoto,
  uploadUserPhoto,
  resizeProductImage,
  uploadProductImage,
} from '../controllers/uploadController.js';

const router = express.Router();

router
  .route('/users')
  .post(protect, uploadImageForUser, resizePhoto, uploadUserPhoto);
router
  .route('/products')
  .post(
    protect,
    restrictTo('admin'),
    uploadImageForProduct,
    resizeProductImage,
    uploadProductImage
  );

export default router;
