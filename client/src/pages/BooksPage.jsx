import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getBooks, reset } from '../redux/slices/bookSlice';
import BookList from '../components/books/BookList';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

function BooksPage() {
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { books, isLoading, isError, message, pagination } = useSelector(
    (state) => state.books
  );
  
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('search') || '';
  const pageNumber = searchParams.get('pageNumber') || 1;
  const genreParam = searchParams.get('genre') || '';
  
  useEffect(() => {
    dispatch(getBooks({ keyword, pageNumber, genre: genreParam }));
    
    return () => {
      dispatch(reset());
    };
  }, [dispatch, keyword, pageNumber, genreParam]);
  
  useEffect(() => {
    if (genreParam) {
      setGenre(genreParam);
    }
  }, [genreParam]);
  
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    if (e.target.value) {
      window.location.href = `/books?genre=${e.target.value}`;
    } else {
      window.location.href = '/books';
    }
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // In a real app, we would dispatch an action to sort the books
    // For now, we'll just simulate it by changing the state
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
  
  return (
    <div className="books-page">
      <div className="container">
        <div className="books-header">
          <h1>Browse Books</h1>
          
          <div className="books-filters">
            <div className="filter-group">
              <label htmlFor="genre">Genre:</label>
              <select
                id="genre"
                value={genre}
                onChange={handleGenreChange}
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="sortBy">Sort By:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="rating">Highest Rating</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
        
        {keyword && (
          <div className="search-results">
            <p>
              Search results for: <strong>{keyword}</strong>
            </p>
            <a href="/books" className="clear-search">
              Clear Search
            </a>
          </div>
        )}
        
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Alert type="danger" message={message} />
        ) : (
          <>
            <BookList books={books} />
            <Pagination
              pages={pagination.pages}
              page={pagination.page}
              keyword={keyword}
              genre={genre}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default BooksPage;
