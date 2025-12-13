import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsScrolled(scrollY > 50);

      // Determine active section based on scroll position
      // Find the section whose center is closest to the viewport center
      const navbarOffset = 80;
      const viewportCenter = scrollY + navbarOffset + windowHeight / 2;
      
      let currentActive = 'home';
      let minDistance = Infinity;
      
      // Check each section to find which one's center is closest to viewport center
      NAVIGATION_ITEMS.forEach((item) => {
        const section = document.getElementById(item.to);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = scrollY + rect.top;
          const sectionCenter = sectionTop + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          
          // Check if section is visible in viewport (at least partially visible)
          const isVisible = rect.top < windowHeight && rect.bottom > navbarOffset;
          
          // Prefer sections that are visible and closer to viewport center
          // Only consider visible sections
          if (isVisible) {
            if (distance < minDistance) {
              minDistance = distance;
              currentActive = item.to;
            }
          }
        }
      });
      
      // If no visible section found (shouldn't happen), fallback to closest section
      if (minDistance === Infinity) {
        NAVIGATION_ITEMS.forEach((item) => {
          const section = document.getElementById(item.to);
          if (section) {
            const rect = section.getBoundingClientRect();
            const sectionTop = scrollY + rect.top;
            const sectionCenter = sectionTop + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);
            
            if (distance < minDistance) {
              minDistance = distance;
              currentActive = item.to;
            }
          }
        });
      }
      
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-logo">
              <Link to="home" smooth={true} duration={500}>
                <img src="/images/logo.png" alt="MVS Healthcare" className="logo-image" />
                <span className="logo-text">MVS HEALTHCARE</span>
              </Link>
            </div>

            <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      // Immediately set active section when link is clicked
                      setActiveSection(item.to);
                    }}
                    className={activeSection === item.to ? 'active' : ''}
                  >
                    <span className="nav-link-text">{item.name}</span>
                    <span className="nav-link-underline"></span>
                  </Link>
                </li>
              ))}
            </ul>

            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

