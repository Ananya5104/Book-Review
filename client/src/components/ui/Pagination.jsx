import { Link } from 'react-router-dom';

function Pagination({ pages, page, keyword = '', genre = '' }) {
  if (pages <= 1) {
    return null;
  }

  const getPageUrl = (pageNumber) => {
    let url = `/books?pageNumber=${pageNumber}`;
    
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    
    if (genre) {
      url += `&genre=${genre}`;
    }
    
    return url;
  };

  return (
    <div className="pagination">
      <ul>
        {page > 1 && (
          <li>
            <Link to={getPageUrl(page - 1)}>Previous</Link>
          </li>
        )}

        {[...Array(pages).keys()].map((x) => (
          <li key={x + 1}>
            <Link
              to={getPageUrl(x + 1)}
              className={x + 1 === page ? 'active' : ''}
            >
              {x + 1}
            </Link>
          </li>
        ))}

        {page < pages && (
          <li>
            <Link to={getPageUrl(page + 1)}>Next</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
