import { Link } from 'react-router-dom';
import Rating from '../ui/Rating';
import { handleImageError, getValidImageUrl } from '../../utils/imageUtils';

function BookCard({ book }) {
  // Use our utility function to get a valid image URL
  const imageUrl = getValidImageUrl(book.coverImage);

  return (
    <div className="book-card">
      <Link to={`/books/${book._id}`}>
        <div className="book-card-image">
          <img
            src={imageUrl}
            alt={book.title}
            onError={handleImageError}
          />
        </div>
        <div className="book-card-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <div className="book-rating">
            <Rating
              value={book.rating}
              text={`${book.numReviews} ${book.numReviews === 1 ? 'review' : 'reviews'}`}
            />
          </div>
          <p className="book-genre">{book.genre}</p>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
