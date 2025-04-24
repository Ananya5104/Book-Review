import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetails, resetBookDetails } from '../redux/slices/bookSlice';
import { deleteReview } from '../redux/slices/reviewSlice';
import Rating from '../components/ui/Rating';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import { formatDate } from '../utils/formatDate';
import { handleImageError, getValidImageUrl } from '../utils/imageUtils';
import { showSuccessToast, showErrorToast } from '../utils/toastUtils';

function BookDetailsPage() {
  const [reviewToEdit, setReviewToEdit] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { book, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBookDetails(id));

    return () => {
      dispatch(resetBookDetails());
    };
  }, [dispatch, id]);

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(reviewId))
        .unwrap()
        .then(() => {
          showSuccessToast('Review deleted successfully!');
          // Refresh book details to update rating
          dispatch(getBookDetails(id));
        })
        .catch((error) => {
          showErrorToast(error || 'Failed to delete review');
        });
    }
  };

  const handleEditReview = (review) => {
    setReviewToEdit(review);
    window.scrollTo({
      top: document.querySelector('.review-form-container').offsetTop - 100,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert type="danger" message={message} />;
  }

  if (!book) {
    return <Alert type="info" message="Book not found" />;
  }

  return (
    <div className="book-details-page">
      <div className="container">
        <div className="book-details">
          <div className="book-image">
            <img
              src={book.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover+Available'}
              alt={book.title}
              onError={handleImageError}
            />
          </div>

          <div className="book-info">
            <div className="book-header">
              <h1 className="book-title">{book.title}</h1>
              <p className="book-author">by {book.author}</p>
            </div>

            <div className="book-meta">
              <div className="book-rating">
                <Rating
                  value={book.rating}
                  text={`${book.numReviews} ${
                    book.numReviews === 1 ? 'review' : 'reviews'
                  }`}
                />
              </div>

              <div className="book-details-list">
                <div className="detail-item">
                  <span className="detail-label">Genre:</span>
                  <span className="detail-value">{book.genre}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Published:</span>
                  <span className="detail-value">{book.publicationYear}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Publisher:</span>
                  <span className="detail-value">{book.publisher}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">ISBN:</span>
                  <span className="detail-value">{book.isbn}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Added on:</span>
                  <span className="detail-value">
                    {formatDate(book.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="book-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          </div>
        </div>

        <div className="book-reviews-section">
          <h2>Reviews</h2>

          {user ? (
            <ReviewForm
              bookId={book._id}
              reviewToEdit={reviewToEdit}
              setReviewToEdit={setReviewToEdit}
            />
          ) : (
            <div className="login-prompt">
              <p>Please <Link to="/login">sign in</Link> to write a review.</p>
            </div>
          )}

          <ReviewList
            bookId={book._id}
            onDelete={handleDeleteReview}
            onEdit={handleEditReview}
          />
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;
