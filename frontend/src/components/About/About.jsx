import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MISSION, VISION } from '../../utils/constants';
import './About.css';

const About = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1400);
  const [containerWidth, setContainerWidth] = useState(1400);
  const [spacerHeight, setSpacerHeight] = useState(0);
  
  useEffect(() => {
    const calculateDimensions = () => {
      setViewportWidth(window.innerWidth);
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setContainerWidth(containerRect.width || window.innerWidth);
        
        const firstCard = containerRef.current.querySelector('.about-card');
        if (firstCard) {
          const cardRect = firstCard.getBoundingClientRect();
          setCardWidth(cardRect.width);
          
          // Calculate spacer height for smooth scroll animation
          // Animation happens over 50% of scroll (faster), then wait period
          const animationHeight = window.innerHeight * 1.2; // Reduced animation space
          const waitHeight = window.innerHeight * 0.3; // Reduced wait period
          setSpacerHeight(animationHeight + waitHeight);
        }
      }
    };
    
    calculateDimensions();
    setTimeout(calculateDimensions, 100);
    setTimeout(calculateDimensions, 500);
    
    const handleResize = () => {
      calculateDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Scroll progress: 0 = section becomes sticky, 1 = spacer fully scrolled
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  // Animation progress: Cards animate over first 50% of scroll (faster)
  const animationProgress = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, 1],
    { clamp: false }
  );

  // Calculate gap between cards (60px gap)
  const gap = 60;
  
  // Motion values for card positions - updated via useEffect to react to state changes
  const leftCardX = useMotionValue(0);
  const rightCardX = useMotionValue(0);
  
  // Update card positions when dimensions or scroll progress changes
  useEffect(() => {
    if (cardWidth === 0 || viewportWidth === 0) return;
    
    const unsubscribeLeft = animationProgress.onChange((progress) => {
      // Start: Mission card half visible from LEFT edge
      // Card's RIGHT edge should be at x = cardWidth/2 (so right half is visible)
      // Card left edge (before transform) = viewportWidth/2
      // Card right edge (before transform) = viewportWidth/2 + cardWidth
      // To move card right edge from (viewportWidth/2 + cardWidth) to (cardWidth/2):
      // translateX = cardWidth/2 - (viewportWidth/2 + cardWidth) = -viewportWidth/2 - cardWidth/2
      const startX = -viewportWidth / 2 - cardWidth / 2;
      
      // End: centered position
      const endX = -cardWidth - gap / 2;
      
      leftCardX.set(startX + (endX - startX) * progress);
    });
    
    const unsubscribeRight = animationProgress.onChange((progress) => {
      // Start: Vision card half visible from RIGHT edge
      // Card's LEFT edge should be at x = viewportWidth - cardWidth/2 (so left half is visible)
      // Card left edge (before transform) = viewportWidth/2
      // To move card left edge from (viewportWidth/2) to (viewportWidth - cardWidth/2):
      // translateX = (viewportWidth - cardWidth/2) - (viewportWidth/2) = viewportWidth/2 - cardWidth/2
      const startX = viewportWidth / 2 - cardWidth / 2;
      
      // End: centered position
      const endX = gap / 2;
      
      rightCardX.set(startX + (endX - startX) * progress);
    });
    
    // Initialize positions immediately
    const currentProgress = animationProgress.get();
    const leftStartX = -viewportWidth / 2 - cardWidth / 2;
    const leftEndX = -cardWidth - gap / 2;
    leftCardX.set(leftStartX + (leftEndX - leftStartX) * currentProgress);
    
    const rightStartX = viewportWidth / 2 - cardWidth / 2;
    const rightEndX = gap / 2;
    rightCardX.set(rightStartX + (rightEndX - rightStartX) * currentProgress);
    
    return () => {
      unsubscribeLeft();
      unsubscribeRight();
    };
  }, [cardWidth, viewportWidth, animationProgress, gap, leftCardX, rightCardX]);

  // Opacity: Start at 0.5 (half visible), fade in to 1.0 as they move to center
  const leftCardOpacity = useTransform(
    animationProgress,
    (progress) => {
      // Start at 0.5, fade in to 1.0
      return 0.5 + (0.5 * progress);
    }
  );

  const rightCardOpacity = useTransform(
    animationProgress,
    (progress) => {
      // Start at 0.5, fade in to 1.0
      return 0.5 + (0.5 * progress);
    }
  );

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0
      }
    }
  };

  return (
    <div ref={wrapperRef} className="about-wrapper">
      <section 
        id="about" 
        className="about section"
      >
        {/* Geometric Shapes Background */}
        <div className="about-geometric-shapes">
          {/* Striped Circle 1 */}
          <div className="about-striped-circle about-striped-circle-1">
            <div className="about-striped-circle-inner"></div>
          </div>
          
          {/* Striped Circle 2 */}
          <div className="about-striped-circle about-striped-circle-2">
            <div className="about-striped-circle-inner"></div>
          </div>
        </div>
        
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            About Us
          </motion.h2>
          
          <div className="about-carousel-wrapper">
            <div 
              ref={containerRef}
              className="about-content"
            >
              {/* Mission Card (Left) */}
                  <motion.div 
                className="about-card mission-card"
                    style={{ 
                      position: 'absolute',
                  x: leftCardX,
                      y: '-50%',
                  opacity: leftCardOpacity,
                      left: '50%',
                      top: '50%'
                    }}
                    whileHover={{
                  scale: 1.01,
                      transition: {
                    duration: 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    }}
                  >
                    <div className="about-card-header">
                  <h2 className="about-card-title-large">MISSION</h2>
                    <div className="card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <circle cx="12" cy="12" r="2" fill="currentColor"/>
                          <path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                </div>
                    </div>
                <div className="about-card-content">
                  <p className="mission-content">
                    {MISSION.content}
                  </p>
                  <ul className="mission-points">
                    {MISSION.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                  <p className="mission-conclusion">{MISSION.conclusion}</p>
                </div>
              </motion.div>

              {/* Vision Card (Right) */}
              <motion.div 
                className="about-card vision-card"
                style={{ 
                  position: 'absolute',
                  x: rightCardX,
                  y: '-50%',
                  opacity: rightCardOpacity,
                  left: '50%',
                  top: '50%'
                }}
                whileHover={{
                  scale: 1.01,
                  transition: {
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
              >
                <div className="about-card-header">
                  <h2 className="about-card-title-large">VISION</h2>
                <div className="card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                    </div>
                </div>
                    <div className="about-card-content">
                  <p className="vision-content">
                    {VISION.content}
                  </p>
                    </div>
                  </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Spacer creates scroll space for horizontal animation */}
      <div 
        className="about-spacer"
        style={{ height: `${spacerHeight}px` }}
      ></div>
    </div>
  );
};

export default About;
