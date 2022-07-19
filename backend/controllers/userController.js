import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';
import { deleteOne, updateOne, getOne, getAll } from './handlerFactory.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const updateMe = asyncHandler(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedUser);
});

const deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const getUser = getOne(User);
const getAllUsers = getAll(User);
// Do NOT update passwords with this!
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);

const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { wishlist: productId },
  });
  if (!user) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const list = await User.findById(req.params.id)
    .select('wishlist')
    .populate('wishlist');
  if (!list) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json(list);
});
const removeFromWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const user = await User.findByIdAndUpdate(req.user._id, {
    $pull: { wishlist: productId },
  }).clone();
  if (!user) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json(user);
});

export {
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
};
