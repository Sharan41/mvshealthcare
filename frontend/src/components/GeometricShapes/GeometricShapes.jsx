import { useRef, useEffect } from 'react';
import './GeometricShapes.css';

const GeometricShapes = () => {
  const shapesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!shapesRef.current) return;
      
      const scrolled = window.pageYOffset;
      const shapes = shapesRef.current.querySelectorAll('.geometric-shape');
      
      shapes.forEach((shape, index) => {
        // Skip striped circle - it has its own animation
        if (shape.classList.contains('striped-circle')) {
          return;
        }
        
        // Different parallax speeds for different shapes
        const speeds = [0.3, 0.5, 0.4];
        const speed = speeds[index] || 0.5;
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={shapesRef} className="geometric-shapes-container">
      {/* Dot Grids - 4x5 (20 dots each) */}
      {/* Top-Left Grid */}
      <div className="geometric-shape dot-grid-top-left">
        <div className="dot-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
      </div>
      
      {/* Top-Right Grid */}
      <div className="geometric-shape dot-grid-top-right">
        <div className="dot-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
      </div>
      
      {/* Bottom-Center Grid */}
      <div className="geometric-shape dot-grid-bottom-center">
        <div className="dot-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
      </div>

      {/* Striped Circle - Moving from bottom right to bottom left */}
      <div className="geometric-shape striped-circle">
        <div className="striped-circle-inner"></div>
      </div>
    </div>
  );
};

export default GeometricShapes;

