import { Link } from 'react-router-dom';
import Card from '../components/Card';
import menu from '../data/menu.json';
import { formatPrice } from '../utils/formatPrice';
import { usePageTitle } from '../hooks/usePageTitle';
import './Home.css';

const featured = menu.filter((item) => item.featured);

function Home() {
  usePageTitle();

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Baked fresh, poured with care</h1>
          <p className="tagline">
            Your neighbourhood café on Kiln Lane, serving wood-fired pastries, seasonal breakfasts
            and specialty coffee seven days a week.
          </p>
          <Link to="/menu" className="button">
            View Menu
          </Link>
        </div>
      </section>

      <section className="container featured">
        <h2>Customer favourites</h2>
        <div className="featured-grid">
          {featured.map((item) => (
            <Card key={item.id} title={item.name} price={formatPrice(item.price)}>
              {item.description}
            </Card>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Planning a visit?</h2>
            <p>Book ahead for weekend brunch or groups, and we'll have your table ready.</p>
          </div>
          <Link to="/book" className="button">
            Reserve a table
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
