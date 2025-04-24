const express = require('express');
const { check } = require('express-validator');
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get reviews for a book
router.get('/', getReviews);

// Create a review
router.post(
  '/',
  [
    protect,
    check('title', 'Title is required').not().isEmpty(),
    check('rating', 'Rating is required and must be between 1 and 5')
      .isNumeric()
      .isInt({ min: 1, max: 5 }),
    check('comment', 'Comment is required').not().isEmpty(),
    check('bookId', 'Book ID is required').not().isEmpty(),
  ],
  createReview
);

// Update a review
router.put(
  '/:id',
  [
    protect,
    check('title', 'Title is required').optional(),
    check('rating', 'Rating must be between 1 and 5')
      .optional()
      .isNumeric()
      .isInt({ min: 1, max: 5 }),
    check('comment', 'Comment is required').optional(),
  ],
  updateReview
);

// Delete a review
router.delete('/:id', protect, deleteReview);

module.exports = router;
