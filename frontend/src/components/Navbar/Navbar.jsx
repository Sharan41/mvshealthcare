import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only run complex active section detection on desktop
      if (isMobile) {
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
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
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Manual scroll handler for mobile
  const handleMobileNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = 80;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = sectionTop - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
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
              {isMobile && (
                <li className="mobile-menu-close-wrapper">
                  <button
                    className="mobile-menu-close-btn"
                    onClick={toggleMobileMenu}
                    aria-label="Close menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6l12 12" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </li>
              )}
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.to}>
                  {isMobile ? (
                    <a
                      href={`#${item.to}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileNavClick(item.to);
                      }}
                      className="nav-link-text"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      onClick={() => {
                        setActiveSection(item.to);
                      }}
                      className={activeSection === item.to ? 'active' : ''}
                    >
                      <span className="nav-link-text">{item.name}</span>
                      <span className="nav-link-underline"></span>
                    </Link>
                  )}
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

