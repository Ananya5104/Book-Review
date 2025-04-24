import FeaturedBooks from '../components/books/FeaturedBooks';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Discover Your Next Favorite Book</h1>
            <p>
              Join our community of book lovers to find, review, and share your
              reading experiences.
            </p>
            <div className="hero-buttons">
              <a href="/books" className="btn-primary">
                Browse Books
              </a>
              <a href="/register" className="btn-secondary">
                Join Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <FeaturedBooks />

      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>Discover</h3>
              <p>Find books by genre, author, or title</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Read</h3>
              <p>Explore detailed book information and reviews</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Review</h3>
              <p>Share your thoughts and rate books</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>Refine</h3>
              <p>Use AI to enhance your reviews</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
