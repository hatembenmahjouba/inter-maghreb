import AppError from '../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id).clone();

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      data: null,
    });
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).clone();

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json(doc);
  });

const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json(doc);
  });

const getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id).clone();
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json(doc);
  });

const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    // To allow for nested GET reviews on product
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    const queryStr = features.queryStr;
    const count = await Model.countDocuments({ ...filter, ...queryStr });

    // SEND RESPONSE
    res.status(200).json({ doc, page, pages: Math.ceil(count / limit), count });
  });

const updateOneBySlug = (Model) =>
  asyncHandler(async (req, res) => {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const doc = await Model.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).clone();
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json(doc);
  });

const deleteOneBySlug = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({ slug: req.params.slug }).clone();

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      data: null,
    });
  });

const getOneBySlug = (Model, popOptions) =>
  asyncHandler(async (req, res) => {
    let query = Model.findOne({ slug: req.params.slug });
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json(doc);
  });

export {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
  updateOneBySlug,
  deleteOneBySlug,
  getOneBySlug,
};
