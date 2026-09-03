import { Link } from 'react-router-dom'
import menu from '../data/menu.json'
import { formatPrice } from '../utils/formatPrice'
import './Home.css'

const featured = menu.filter((item) => item.featured)

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Baked fresh, poured with care</h1>
          <p className="tagline">
            Your neighbourhood café on Kiln Lane, serving wood-fired pastries, seasonal breakfasts and specialty coffee seven days a week.
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
            <article key={item.id} className="featured-item">
              <div className="featured-item-header">
                <h3>{item.name}</h3>
                <span className="price">{formatPrice(item.price)}</span>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
