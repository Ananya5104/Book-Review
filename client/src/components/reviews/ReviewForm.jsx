import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReview,
  updateReview,
  refineReviewWithAI,
  clearRefinedReview,
  reset,
} from '../../redux/slices/reviewSlice';
import { showSuccessToast, showErrorToast, showInfoToast } from '../../utils/toastUtils';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';

function ReviewForm({ bookId, reviewToEdit, setReviewToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    rating: 5,
    comment: '',
    refinedComment: '',
  });
  const [showRefined, setShowRefined] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message: errorMessage, refinedReview } = useSelector(
    (state) => state.reviews
  );

  // Reset review state when component mounts
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (reviewToEdit) {
      setFormData({
        title: reviewToEdit.title,
        rating: reviewToEdit.rating,
        comment: reviewToEdit.comment,
        refinedComment: reviewToEdit.refinedComment || '',
      });
    }
  }, [reviewToEdit]);

  useEffect(() => {
    if (refinedReview) {
      setFormData((prevState) => ({
        ...prevState,
        refinedComment: refinedReview,
      }));
      setShowRefined(true);
    }
  }, [refinedReview]);

  // Track if a form submission has been made
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (isSuccess && hasSubmitted) {
      // Show success toast notification only if a form was submitted
      if (reviewToEdit) {
        showSuccessToast('Review updated successfully!');
      } else {
        showSuccessToast('Review submitted successfully!');
      }

      // Reset form
      setFormData({
        title: '',
        rating: 5,
        comment: '',
        refinedComment: '',
      });
      setShowRefined(false);
      setReviewToEdit && setReviewToEdit(null);
      dispatch(reset());

      // Reset submission state
      setHasSubmitted(false);
    }
  }, [isSuccess, hasSubmitted, dispatch, setReviewToEdit, reviewToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.comment) {
      setMessage('Please fill in all fields');
      showErrorToast('Please fill in all fields');
      return;
    }

    const reviewData = {
      title: formData.title,
      rating: formData.rating,
      comment: formData.comment,
      refinedComment: formData.refinedComment,
      bookId,
    };

    // Set submission flag to true
    setHasSubmitted(true);

    if (reviewToEdit) {
      dispatch(updateReview({ id: reviewToEdit._id, reviewData }));
    } else {
      dispatch(createReview(reviewData));
    }
  };

  const handleRefine = () => {
    if (!formData.comment) {
      setMessage('Please write a review first');
      showErrorToast('Please write a review first');
      return;
    }

    showInfoToast('Refining your review with AI...');
    dispatch(refineReviewWithAI(formData.comment));
  };

  const handleCancelRefine = () => {
    setShowRefined(false);
    setFormData((prevState) => ({
      ...prevState,
      refinedComment: '',
    }));
    dispatch(clearRefinedReview());
  };

  const handleUseOriginal = () => {
    setFormData((prevState) => ({
      ...prevState,
      refinedComment: '',
    }));
    setShowRefined(false);
    dispatch(clearRefinedReview());
  };

  const handleUseRefined = () => {
    // Set submission flag to true before submitting
    setHasSubmitted(true);
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="review-form-container">
      <h3>{reviewToEdit ? 'Edit Review' : 'Write a Review'}</h3>

      {message && <Alert type="danger" message={message} />}
      {isError && <Alert type="danger" message={errorMessage} />}

      {isLoading ? (
        <Spinner />
      ) : showRefined ? (
        <div className="review-comparison">
          <div className="review-original">
            <h4>Original Review</h4>
            <p>{formData.comment}</p>
            <button className="btn-primary" onClick={handleUseOriginal}>
              Use Original
            </button>
          </div>

          <div className="review-refined">
            <h4>AI-Refined Review</h4>
            <p>{formData.refinedComment}</p>
            <button className="btn-primary" onClick={handleUseRefined}>
              Use Refined
            </button>
          </div>

          <button className="btn-secondary" onClick={handleCancelRefine}>
            Cancel
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your review a title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Review</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Write your review here"
              rows="5"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {reviewToEdit ? 'Update Review' : 'Submit Review'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={handleRefine}
            >
              Refine with AI
            </button>

            {reviewToEdit && (
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setReviewToEdit(null)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
