import { useState, useEffect } from 'react';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'products', 'why-choose-us', 'contact'];
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Determine active section
      const scrollPosition = scrolled + windowHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'why-choose-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="scroll-indicator">
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill"
          style={{ height: `${scrollProgress}%` }}
        ></div>
      </div>
      
      <div className="scroll-section-markers">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`scroll-marker ${activeSection === section.id ? 'active' : ''}`}
            style={{ top: `${(index / (sections.length - 1)) * 100}%` }}
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            title={section.label}
          >
            <div className="marker-dot"></div>
            <div className="marker-label">{section.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollIndicator;


