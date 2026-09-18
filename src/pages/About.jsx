import { business } from '../data/business';
import { usePageTitle } from '../hooks/usePageTitle';
import './About.css';

function About() {
  usePageTitle('About');

  return (
    <div className="container page">
      <h1>About Ember &amp; Oak</h1>
      <div className="about-grid">
        <div className="about-story">
          <h2>Our story</h2>
          <p>
            Ember &amp; Oak opened in 2016, when Sam and Jo Carter took over the old bakery on Kiln
            Lane. The wood-fired oven that gives us our name had sat cold for almost ten years. We
            relit it on our first morning and it hasn't gone out since.
          </p>
          <p>
            Every loaf and pastry is baked on site before sunrise, and our coffee is roasted in
            small batches by a roaster two streets away. We believe a good café should feel like a
            second kitchen: somewhere to linger, catch up with friends, or enjoy a quiet moment on
            your own.
          </p>
          <p>
            Today we are a team of eleven bakers, cooks and baristas, and we still know most of our
            regulars by name (and by order).
          </p>
        </div>

        <aside className="about-info">
          <h2>Opening hours</h2>
          <dl className="hours-list">
            {business.hours.map((row) => (
              <div key={row.days}>
                <dt>{row.days}</dt>
                <dd>{row.time}</dd>
              </div>
            ))}
          </dl>

          <h2>Find us</h2>
          <address>
            {business.address.street}
            <br />
            {business.address.locality}
          </address>
          <p>Street parking is free on Kiln Lane, and the 42 bus stops right outside.</p>
        </aside>
      </div>
    </div>
  );
}

export default About;
