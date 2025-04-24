import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, deleteBook, reset } from '../../redux/slices/bookSlice';
import Spinner from '../ui/Spinner';
import Alert from '../ui/Alert';
import { formatDate } from '../../utils/formatDate';
import { showSuccessToast, showErrorToast } from '../../utils/toastUtils';

function BookTable({ onEdit }) {
  const dispatch = useDispatch();
  const { books, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(getBooks({}));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Refresh the book list when an operation is successful
  useEffect(() => {
    if (isSuccess) {
      dispatch(getBooks({}));
    }
  }, [isSuccess, dispatch]);

  // Show toast notification when error occurs
  useEffect(() => {
    if (isError) {
      showErrorToast(message || 'An error occurred');
    }
  }, [isError, message]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(id))
        .unwrap()
        .then(() => {
          showSuccessToast('Book deleted successfully!');
        })
        .catch((error) => {
          showErrorToast(error || 'Failed to delete book');
        });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="book-table-container">
      <h2>Manage Books</h2>

      {isError && <Alert type="danger" message={message} />}
      {isSuccess && <Alert type="success" message="Operation successful" />}

      {books && books.length > 0 ? (
        <div className="table-responsive">
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publication Year</th>
                <th>Added On</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.publicationYear}</td>
                  <td>{formatDate(book.createdAt)}</td>
                  <td>{book.featured ? 'Yes' : 'No'}</td>
                  <td className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(book)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(book._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-books">No books found. Add some books to get started.</p>
      )}
    </div>
  );
}

export default BookTable;
