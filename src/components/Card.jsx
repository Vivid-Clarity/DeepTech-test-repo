import './Card.css';

function Card({ title, price, children }) {
  return (
    <article className="card">
      <div className="card-header">
        <h3>{title}</h3>
        {price && <span className="price">{price}</span>}
      </div>
      <p>{children}</p>
    </article>
  );
}

export default Card;
