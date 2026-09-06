import { Link } from 'react-router-dom'
import Card from '../components/Card'
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
            <Card key={item.id} title={item.name} price={formatPrice(item.price)}>
              {item.description}
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
