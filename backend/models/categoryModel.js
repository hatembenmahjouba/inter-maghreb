import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      minlength: [3, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: { type: String, unique: true, lowercase: true },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

categorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'category',
  localField: '_id',
});

categorySchema.virtual('subs', {
  ref: 'SubCategory',
  foreignField: 'category',
  localField: '_id',
});

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'subs',
    select: 'name slug',
  });
  next();
});

categorySchema.index({ slug: 1 });

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
