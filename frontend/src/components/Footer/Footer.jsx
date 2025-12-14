import { Link } from 'react-scroll';
import { COMPANY_INFO, NAVIGATION_ITEMS } from '../../utils/constants';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappLink = `https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/\D/g, '')}`;
  const callLink = `tel:${COMPANY_INFO.contact.phone}`;
  const emailLink = `mailto:${COMPANY_INFO.contact.email}`;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{COMPANY_INFO.name}</h3>
            <p className="footer-tagline">{COMPANY_INFO.tagline}</p>
            <p className="footer-description">
              Leading manufacturer and supplier of medical disposables and healthcare products.
            </p>
          </div>

          <div className="footer-section footer-quick-links">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} smooth={true} duration={500}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>
                <a href={callLink}>
                  <FaPhone className="footer-phone-icon" /> {COMPANY_INFO.contact.phone}
                </a>
              </li>
              <li>
                <a href={emailLink}>
                  <FaEnvelope /> {COMPANY_INFO.contact.email}
                </a>
              </li>
              <li>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Address</h4>
            <p className="footer-address">
              {COMPANY_INFO.address.line1}<br />
              {COMPANY_INFO.address.line2}<br />
              {COMPANY_INFO.address.district}<br />
              {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}<br />
              {COMPANY_INFO.address.country}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.</p>
          {COMPANY_INFO.certifications.map((cert, index) => (
            <p key={index} className="certification">{cert}</p>
          ))}
          <div className="footer-credits-divider"></div>
          <p className="footer-credits">
            <span className="footer-credits-text">Created by</span>{' '}
            <a 
              href="https://www.linkedin.com/in/sai-sharan-vishnu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-credits-link"
            >
              Sai Sharan.V
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


