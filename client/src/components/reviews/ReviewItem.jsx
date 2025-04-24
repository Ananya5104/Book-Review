import { useSelector } from 'react-redux';
import Rating from '../ui/Rating';
import { getRelativeTime } from '../../utils/formatDate';

function ReviewItem({ review, onDelete, onEdit }) {
  const { user } = useSelector((state) => state.auth);
  
  const isAuthor = user && user._id === review.user._id;
  
  return (
    <div className="review-item">
      <div className="review-header">
        <div className="review-user">
          <h4>{review.user.name}</h4>
          <span className="review-date">{getRelativeTime(review.createdAt)}</span>
        </div>
        <div className="review-rating">
          <Rating value={review.rating} />
        </div>
      </div>
      
      <h3 className="review-title">{review.title}</h3>
      
      <div className="review-content">
        <p>{review.comment}</p>
        
        {review.refinedComment && (
          <div className="refined-comment">
            <h5>AI-Refined Version:</h5>
            <p>{review.refinedComment}</p>
          </div>
        )}
      </div>
      
      {isAuthor && (
        <div className="review-actions">
          <button className="btn-edit" onClick={() => onEdit(review)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(review._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewItem;
