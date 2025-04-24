import axios from 'axios';

const API_URL = 'https://book-review-3eod.onrender.com/api/books';

// Get all books
const getBooks = async (keyword = '', pageNumber = 1, genre = '') => {
  let url = `${API_URL}?pageNumber=${pageNumber}`;

  if (keyword) {
    url += `&keyword=${keyword}`;
  }

  if (genre) {
    url += `&genre=${genre}`;
  }

  const response = await axios.get(url);
  return response.data;
};

// Get featured books
const getFeaturedBooks = async () => {
  const response = await axios.get(`${API_URL}/featured`);
  return response.data;
};

// Get book details
const getBookDetails = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a book (admin only)
const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, bookData, config);
  return response.data;
};

// Update a book (admin only)
const updateBook = async (id, bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, bookData, config);
  return response.data;
};

// Delete a book (admin only)
const deleteBook = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const bookService = {
  getBooks,
  getFeaturedBooks,
  getBookDetails,
  createBook,
  updateBook,
  deleteBook,
};

export default bookService;
