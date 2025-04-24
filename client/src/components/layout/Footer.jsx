function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>BookReview</h3>
            <p>Your go-to platform for book reviews and recommendations</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Navigation</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/books">Books</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Genres</h4>
              <ul>
                <li><a href="/books?genre=Fiction">Fiction</a></li>
                <li><a href="/books?genre=Non-Fiction">Non-Fiction</a></li>
                <li><a href="/books?genre=Mystery">Mystery</a></li>
                <li><a href="/books?genre=Science Fiction">Science Fiction</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:info@bookreview.com">info@bookreview.com</a></li>
                <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} BookReview. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
