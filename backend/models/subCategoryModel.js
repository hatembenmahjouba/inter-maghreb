import mongoose from 'mongoose';
import slugify from 'slugify';

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      minlength: [3, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: { type: String, unique: true, lowercase: true },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must belong to a product.'],
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

subCategorySchema.index({ slug: 1 });

subCategorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'subCategory',
  localField: '_id',
});

subCategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;
