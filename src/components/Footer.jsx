import { business } from '../data/business';
import OpenStatus from './OpenStatus';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <p className="footer-brand">{business.name}</p>
          <address>
            {business.address.street}
            <br />
            {business.address.locality}
          </address>
        </div>
        <div className="footer-col">
          <h2 className="footer-heading">
            Opening hours <OpenStatus />
          </h2>
          <dl className="footer-hours">
            {business.hours.map((row) => (
              <div key={row.days}>
                <dt>{row.days}</dt>
                <dd>{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
