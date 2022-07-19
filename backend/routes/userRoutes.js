import express from 'express';
import {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
} from '../controllers/authController.js';
import {
  getMe,
  updateMe,
  deleteMe,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.route('/wishlist').get(getMe, getWishlist).post(addToWishlist);
router.route('/wishlist/:id').patch(removeFromWishlist);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
