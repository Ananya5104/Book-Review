const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    coverImage: {
      type: String,
      default: '/images/default-book.jpg',
    },
    genre: {
      type: String,
      required: [true, 'Please add a genre'],
    },
    publicationYear: {
      type: Number,
      required: [true, 'Please add a publication year'],
    },
    isbn: {
      type: String,
      required: [true, 'Please add an ISBN'],
      unique: true,
    },
    publisher: {
      type: String,
      required: [true, 'Please add a publisher'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for reviews
bookSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'book',
  justOne: false,
});

// Cascade delete reviews when a book is deleted
bookSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ book: this._id });
  next();
});

module.exports = mongoose.model('Book', bookSchema);
