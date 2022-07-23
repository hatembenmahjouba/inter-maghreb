import multer from 'multer';
import sharp from 'sharp';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload inly images', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter: multerFilter,
});

const resizePhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) next();
  req.file.filename = `user-${req.file.fieldname}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/images/users/${req.file.filename}`);
  next();
});

const uploadImageForUser = upload.single('photo');
const uploadImageForProduct = upload.single('image');

const uploadUserPhoto = (req, res) => {
  if (!req.file.fieldname) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  res.status(201).json({ photo: `/uploads/images/users/${req.file.filename}` });
};

const resizeProductImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `product-${req.file.fieldname}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(2000, 1333, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/images/products/${req.file.filename}`);
  next();
});

const uploadProductImage = (req, res) => {
  if (!req.file.fieldname) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  res
    .status(201)
    .json({ image: `/uploads/images/products/${req.file.filename}` });
};

export {
  uploadImageForUser,
  uploadImageForProduct,
  uploadUserPhoto,
  resizePhoto,
  resizeProductImage,
  uploadProductImage,
};
