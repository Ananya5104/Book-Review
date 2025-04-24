const { validationResult } = require('express-validator');
const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');

// @desc    Get reviews for a book
// @route   GET /api/reviews?bookId=xxx
// @access  Public
const getReviews = async (req, res) => {
  try {
    const { bookId } = req.query;

    if (!bookId) {
      return res.status(400).json({ message: 'Please provide a book ID' });
    }

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, rating, comment, bookId, refinedComment } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user already reviewed this book
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      book: bookId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    // Create review
    const review = await Review.create({
      title,
      rating: Number(rating),
      comment,
      refinedComment: refinedComment || '',
      user: req.user._id,
      book: bookId,
    });

    // Populate user data
    await review.populate('user', 'name');

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, rating, comment, refinedComment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update review
    review.title = title || review.title;
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.refinedComment = refinedComment !== undefined ? refinedComment : review.refinedComment;

    const updatedReview = await review.save();

    // Populate user data
    await updatedReview.populate('user', 'name');

    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review or is admin
    if (
      review.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Store the book ID for fallback recalculation
    const bookId = review.book;

    // Use deleteOne() which will trigger the post-deleteOne middleware
    await review.deleteOne();

    // Fallback: manually recalculate the book's rating and review count
    // This ensures the book stats are updated even if the middleware fails
    try {
      await Review.getAverageRating(bookId);
    } catch (err) {
      console.error('Error recalculating book rating:', err);
      // Continue with the response even if recalculation fails
    }

    res.json({ message: 'Review removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};
