import Product from '../models/productModel.js';
import {
  createOne,
  getAll,
  getOneBySlug,
  updateOneBySlug,
  deleteOneBySlug,
} from './handlerFactory.js';

const getProducts = getAll(Product);
const getProductBySlug = getOneBySlug(Product, { path: 'reviews' });
const createProduct = createOne(Product);
const updateProduct = updateOneBySlug(Product);
const deleteProduct = deleteOneBySlug(Product);

const aliasTopProducts = (req, res, next) => {
  req.query.limit = '10';
  req.query.sort = '-rating,price';
  next();
};
const aliasNewProducts = (req, res, next) => {
  req.query.limit = '10';
  req.query.sort = '-createdAt,price';
  next();
};

const updateStock = (req, res, next) => {
  const { orderItems } = req.body;
  orderItems.forEach(async (item) => {
    const product = await Product.findById(item.product);
    product.countInStock -= item.qty;
    if (product.countInStock < 0) {
      return next(new AppError('Count in stock does not exist', 400));
    }
    await product.save();
  });

  next();
};

export {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  aliasTopProducts,
  aliasNewProducts,
  updateStock,
};
