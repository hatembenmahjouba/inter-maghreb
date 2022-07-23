import mongoose from 'mongoose';
import slugify from 'slugify';
import Category from './categoryModel.js';
import SubCategory from './subCategoryModel.js';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A product must have a name'],
      minlength: [3, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: { type: String, unique: true, lowercase: true },
    image: {
      type: String,
      required: [true, 'A product must have an image'],
    },
    brand: {
      type: String,
      required: [true, 'A product must have a brand'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: Category,
    },
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: SubCategory,
      },
    ],

    description: {
      type: String,
      required: [true, 'A product must have a description'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      default: 0,
      trim: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: String,
      default: 'Yes',
      enum: ['Yes', 'No'],
      required: [true, 'A product must be added to shipping or not'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ price: 1, rating: 1 });
productSchema.index({ slug: 1 });

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.pre(/^find/, function (next) {
  this.find({ shipping: { $ne: 'No' } });
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
