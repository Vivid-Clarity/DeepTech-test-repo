import { useState } from 'react';
import Card from '../components/Card';
import menu from '../data/menu.json';
import { formatPrice } from '../utils/formatPrice';
import './Menu.css';

const categories = ['Coffee', 'Pastries', 'Breakfast', 'Lunch'];
const filters = ['All', ...categories];

function Menu() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleCategories =
    activeFilter === 'All' ? categories : categories.filter((c) => c === activeFilter);

  return (
    <div className="container page">
      <h1>Our Menu</h1>
      <p className="lead">
        Everything is baked or cooked on site. Please let us know about any allergies when you
        order.
      </p>

      <div className="menu-filters" role="group" aria-label="Filter menu by category">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={filter === activeFilter ? 'filter-button active' : 'filter-button'}
            aria-pressed={filter === activeFilter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {visibleCategories.map((category) => (
        <section key={category} className="menu-category">
          <h2>{category}</h2>
          <div className="menu-grid">
            {menu
              .filter((item) => item.category === category)
              .map((item) => (
                <Card key={item.id} title={item.name} price={formatPrice(item.price)}>
                  {item.description}
                </Card>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Menu;
