import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookReviews, reset } from '../../redux/slices/reviewSlice';
import ReviewItem from './ReviewItem';
import Spinner from '../ui/Spinner';
import Alert from '../ui/Alert';

function ReviewList({ bookId, onDelete, onEdit }) {
  const dispatch = useDispatch();
  const { reviews, isLoading, isError, message } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    // Reset the review state to clear any previous success/error states
    dispatch(reset());
    // Then fetch the reviews
    dispatch(getBookReviews(bookId));

    // Clean up when component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch, bookId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert type="danger" message={message} />;
  }

  if (!reviews || reviews.length === 0) {
    return <p className="no-reviews">No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ReviewList;
