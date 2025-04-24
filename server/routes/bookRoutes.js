const express = require('express');
const { check } = require('express-validator');
const {
  getBooks,
  getFeaturedBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all books
router.get('/', getBooks);

// Get featured books
router.get('/featured', getFeaturedBooks);

// Get single book
router.get('/:id', getBookById);

// Create a book (admin only)
router.post(
  '/',
  [
    protect,
    admin,
    check('title', 'Title is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('genre', 'Genre is required').not().isEmpty(),
    check('publicationYear', 'Publication year is required').isNumeric(),
    check('isbn', 'ISBN is required').not().isEmpty(),
    check('publisher', 'Publisher is required').not().isEmpty(),
  ],
  createBook
);

// Update a book (admin only)
router.put(
  '/:id',
  [
    protect,
    admin,
    check('title', 'Title is required').optional(),
    check('author', 'Author is required').optional(),
    check('description', 'Description is required').optional(),
    check('genre', 'Genre is required').optional(),
    check('publicationYear', 'Publication year is required').optional().isNumeric(),
    check('isbn', 'ISBN is required').optional(),
    check('publisher', 'Publisher is required').optional(),
    check('featured', 'Featured must be a boolean').optional().isBoolean(),
  ],
  updateBook
);

// Delete a book (admin only)
router.delete('/:id', protect, admin, deleteBook);

module.exports = router;
