import { Link } from 'react-router-dom';
import Card from '../components/Card';
import menu from '../data/menu.json';
import { formatPrice } from '../utils/formatPrice';
import './Home.css';

const featured = menu.filter((item) => item.featured);

const testimonials = [
  {
    quote: 'The croissants are the best I have had outside of Paris. I come in every Saturday.',
    name: 'Hazel P.',
    detail: 'regular since 2018',
  },
  {
    quote: 'Friendly staff, great coffee and they always remember my order. Feels like home.',
    name: 'Tom R.',
    detail: 'local resident',
  },
  {
    quote: 'We booked a table for eight for a birthday brunch and the team made it so easy.',
    name: 'Aisha K.',
    detail: 'first-time visitor',
  },
];

function Home() {
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

      <section className="testimonials">
        <div className="container">
          <h2>What our customers say</h2>
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <figure key={t.name} className="testimonial">
                <blockquote>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption>
                  {t.name}, <span>{t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
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
