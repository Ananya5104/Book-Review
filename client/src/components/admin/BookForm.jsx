import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, updateBook, reset } from '../../redux/slices/bookSlice';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';
import { handleImageError } from '../../utils/imageUtils';

function BookForm({ bookToEdit, setBookToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    genre: '',
    publicationYear: '',
    isbn: '',
    publisher: '',
    featured: false,
  });

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || '',
        author: bookToEdit.author || '',
        description: bookToEdit.description || '',
        coverImage: bookToEdit.coverImage || '',
        genre: bookToEdit.genre || '',
        publicationYear: bookToEdit.publicationYear || '',
        isbn: bookToEdit.isbn || '',
        publisher: bookToEdit.publisher || '',
        featured: bookToEdit.featured || false,
      });
    } else {
      // Reset form when bookToEdit is null
      setFormData({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        genre: '',
        publicationYear: '',
        isbn: '',
        publisher: '',
        featured: false,
      });
    }
  }, [bookToEdit]);

  // This effect runs after a successful form submission
  useEffect(() => {
    // Only reset the form if we've just completed a successful operation
    if (isSuccess) {
      // Reset the form
      setFormData({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        genre: '',
        publicationYear: '',
        isbn: '',
        publisher: '',
        featured: false,
      });

      // Clear the bookToEdit state in the parent component
      if (setBookToEdit) {
        setBookToEdit(null);
      }

      // Reset the Redux state
      dispatch(reset());
    }
  }, [isSuccess, dispatch, setBookToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bookToEdit) {
      dispatch(updateBook({ id: bookToEdit._id, bookData: formData }));
    } else {
      dispatch(createBook(formData));
    }
  };

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Science Fiction',
    'Fantasy',
    'Romance',
    'Thriller',
    'Biography',
    'History',
    'Self-Help',
  ];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="book-form-container">
      <h2>{bookToEdit ? 'Edit Book' : 'Add New Book'}</h2>

      {isError && <Alert type="danger" message={message} />}
      {isSuccess && <Alert type="success" message={bookToEdit ? 'Book updated successfully' : 'Book added successfully'} />}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description"
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="Enter cover image URL"
          />
          {formData.coverImage && (
            <div className="image-preview">
              <img
                src={formData.coverImage}
                alt="Book cover preview"
                onError={handleImageError}
              />
            </div>
          )}
          <small className="form-text">
            Enter a valid image URL. If left blank or invalid, a placeholder image will be used.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="publicationYear">Publication Year</label>
          <input
            type="number"
            id="publicationYear"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            placeholder="Enter publication year"
            min="1800"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Enter publisher"
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured">Featured Book</label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {bookToEdit ? 'Update Book' : 'Add Book'}
          </button>

          {bookToEdit && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setBookToEdit(null)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
