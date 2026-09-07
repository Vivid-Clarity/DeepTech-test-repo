import { Link, NavLink } from 'react-router-dom';
import './Nav.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function Nav() {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          Ember &amp; Oak
        </Link>
        <nav aria-label="Main">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
