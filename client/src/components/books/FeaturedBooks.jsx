import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedBooks } from '../../redux/slices/bookSlice';
import BookCard from './BookCard';
import Spinner from '../ui/Spinner';
import Alert from '../ui/Alert';

function FeaturedBooks() {
  const dispatch = useDispatch();
  const { featuredBooks, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(getFeaturedBooks());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert type="danger" message={message} />;
  }

  if (!featuredBooks || featuredBooks.length === 0) {
    return null;
  }

  return (
    <section className="featured-books">
      <div className="container">
        <h2 className="section-title">Featured Books</h2>
        <div className="featured-books-grid">
          {featuredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedBooks;
