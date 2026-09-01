import menu from '../data/menu.json'
import { formatPrice } from '../utils/formatPrice'
import './Menu.css'

const categories = ['Coffee', 'Pastries', 'Breakfast', 'Lunch']

function Menu() {
  return (
    <div className="container page">
      <h1>Our Menu</h1>
      <p className="lead">
        Everything is baked or cooked on site. Please let us know about any allergies when you order.
      </p>

      {categories.map((category) => (
        <section key={category} className="menu-category">
          <h2>{category}</h2>
          <div className="menu-grid">
            {menu
              .filter((item) => item.category === category)
              .map((item) => (
                <article key={item.id} className="menu-item">
                  <div className="menu-item-header">
                    <h3>{item.name}</h3>
                    <span className="price">{formatPrice(item.price)}</span>
                  </div>
                  <p>{item.description}</p>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Menu
