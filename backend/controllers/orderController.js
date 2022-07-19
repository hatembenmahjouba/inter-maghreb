import Order from '../models/orderModel.js';
import { createOne, getOne, getAll } from './handlerFactory.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';

const addOrderItems = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const createOrder = createOne(Order);

const getOrderById = getOne(Order, { path: 'user', select: 'name email' });

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrders = getAll(Order);

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).clone();

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    return next(new AppError('No Order found with that ID', 404));
  }
});

export {
  addOrderItems,
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
