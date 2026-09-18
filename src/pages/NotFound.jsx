import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

function NotFound() {
  usePageTitle('Page not found');

  return (
    <div className="container page not-found">
      <p className="not-found-code">404</p>
      <h1>Page not found</h1>
      <p className="lead">
        Sorry, we couldn&apos;t find the page you were looking for. It may have moved, or the link
        might be out of date.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="button">
          Back to home
        </Link>
        <Link to="/menu" className="button button-secondary">
          View Menu
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
