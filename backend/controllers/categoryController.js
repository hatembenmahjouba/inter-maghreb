import Category from '../models/categoryModel.js';
import {
  createOne,
  deleteOneBySlug,
  getAll,
  getOneBySlug,
  updateOneBySlug,
} from './handlerFactory.js';
import SubCategory from '../models/subCategoryModel.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';

const getCategories = getAll(Category);
const createCategory = createOne(Category);

const updateCategory = updateOneBySlug(Category);

const deleteCategory = deleteOneBySlug(Category);

const getCategory = getOneBySlug(Category);

const getProductsByCategory = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) {
    return next(new AppError('No Category found with that route', 404));
  }
  const features = new APIFeatures(
    Product.find({
      category: category._id,
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const queryStr = features.queryStr;
  const count = await Product.countDocuments({
    category: category._id,
    ...queryStr,
  });
  const products = await features.query;
  if (!products) {
    return next(new AppError('No Products found with that route', 404));
  }
  res
    .status(200)
    .json({ category, products, count, page, pages: Math.ceil(count / limit) });
});

const getSubCategoriesByCategory = asyncHandler(async (req, res) => {
  const doc = await SubCategory.find({ category: req.params.id });
  if (!doc) {
    return next(new AppError('No sub categories found with that route', 404));
  }
  res.status(200).json({ subs: doc, category: req.params.id });
});

const getProductsSubCategory = asyncHandler(async (req, res) => {
  const { slug, subSlug } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const category = await Category.findOne({ slug });
  if (!category) {
    return next(new AppError('No Category found with that route', 404));
  }
  const subCategory = await SubCategory.findOne({
    category: category._id,
    slug: subSlug,
  });
  if (!subCategory) {
    return next(new AppError('No SubCategory found with that route', 404));
  }
  const features = new APIFeatures(
    Product.find({
      category: category._id,
      subCategory: subCategory._id,
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const queryStr = features.queryStr;
  const count = await Product.countDocuments({
    category: category._id,
    subCategory: subCategory._id,
    ...queryStr,
  });
  const products = await features.query;
  if (!products) {
    return next(new AppError('No products found with that route', 404));
  }
  res.status(200).json({
    category,
    subCategory,
    products,
    count,
    page,
    pages: Math.ceil(count / limit),
  });
});

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
  getSubCategoriesByCategory,
  getProductsSubCategory,
};
