import axios from 'axios';

const API_URL = 'https://book-review-3eod.onrender.com/api/reviews';

// Get reviews for a book
const getBookReviews = async (bookId) => {
  const response = await axios.get(`${API_URL}?bookId=${bookId}`);
  return response.data;
};

// Create a review
const createReview = async (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, reviewData, config);
  return response.data;
};

// Update a review
const updateReview = async (id, reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, reviewData, config);
  return response.data;
};

// Delete a review
const deleteReview = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

// Refine a review with AI
const refineReviewWithAI = async (reviewText) => {
  const response = await axios.post(`${API_URL}/refine`, { reviewText });
  return response.data;
};

const reviewService = {
  getBookReviews,
  createReview,
  updateReview,
  deleteReview,
  refineReviewWithAI,
};

export default reviewService;
