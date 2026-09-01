import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Coffee, bread and good company</h1>
          <p className="tagline">
            Small-batch coffee and pastries baked fresh every morning in the heart of Millbrook.
          </p>
          <Link to="/menu" className="button">
            View Menu
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
