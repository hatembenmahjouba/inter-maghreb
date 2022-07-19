import SubCategory from '../models/subCategoryModel.js';
import {
  createOne,
  getAll,
  updateOneBySlug,
  deleteOneBySlug,
  getOneBySlug,
} from './handlerFactory.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getSubCategories = getAll(SubCategory);
const getSubCategory = getOneBySlug(SubCategory);
const createSubCategory = createOne(SubCategory);
const updateSubCategory = updateOneBySlug(SubCategory);
const deleteSubCategory = deleteOneBySlug(SubCategory);

const getProductsBySubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findOne({ slug: req.params.slug });
  if (!subCategory) {
    return next(new AppError('No SubCategory found with that route', 404));
  }
  const products = await Product.find({ subCategory: subCategory._id });
  if (!products) {
    return next(new AppError('No Products found with that route', 404));
  }
  res.status(200).json({ subCategory, products });
});

export {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getProductsBySubCategory,
};
