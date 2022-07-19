import Review from '../models/reviewModel.js';
import { createOne, deleteOne, getOne, getAll } from './handlerFactory.js';
import asyncHandler from 'express-async-handler';

const setProductUserIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ user: req.user._id });
  res.json(reviews);
});
const deleteMyReview = asyncHandler(async (req, res) => {
  await Review.findOneAndRemove({
    user: req.user._id,
    _id: req.params.id,
  }).clone();
  res.status(204).json({ data: null });
});
const updateMyReview = asyncHandler(async (req, res) => {
  const filter = {
    user: req.user._id,
    _id: req.params.id,
  };
  const review = await Review.findOneAndUpdate(filter, req.body, {
    new: true,
    runValidators: true,
  }).clone();
  res.status(204).json(review);
});

const getAllReviews = getAll(Review);
const getReview = getOne(Review);
const createReview = createOne(Review);
const deleteReview = deleteOne(Review);

export {
  setProductUserIds,
  createReview,
  getAllReviews,
  deleteReview,
  getReview,
  getMyReviews,
  deleteMyReview,
  updateMyReview,
};
