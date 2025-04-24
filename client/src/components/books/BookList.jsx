import BookCard from './BookCard';

function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p className="no-books">No books found.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
