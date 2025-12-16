import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MISSION, VISION } from '../../utils/constants';
import './About.css';

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Calculate gap between cards (60px gap)
  const gap = 60;

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
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1
      }
    }
  };

  // Card animation variants - slide in from sides with fade
  const missionCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      x: isMobile ? 0 : -80
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1
      }
    }
  };

  const visionCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      x: isMobile ? 0 : 80
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.25
      }
    }
  };

  return (
    <div className="about-wrapper">
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
            viewport={{ once: true, amount: isMobile ? 0.1 : 0.3, margin: isMobile ? "0px" : "0px" }}
          >
            About Us
          </motion.h2>
          
          <div className="about-carousel-wrapper">
            <div className="about-content">
              {/* Mission Card (Left) */}
              <motion.div 
                className="about-card mission-card"
                variants={missionCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{ 
                  position: isMobile ? 'relative' : 'absolute',
                  left: isMobile ? 'auto' : 'calc(50% - 550px)',
                  top: isMobile ? 'auto' : '0',
                  transform: isMobile ? 'none' : 'none',
                  willChange: 'auto'
                }}
                whileHover={{
                  scale: isMobile ? 1 : 1.01,
                  transition: {
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
              >
                    <div className="about-card-header">
                  <h2 className="about-card-title-large">MISSION</h2>
                    <div className="card-icon">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                          <circle cx="12" cy="12" r="2" fill="currentColor"/>
                          <path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
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
                variants={visionCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{ 
                  position: isMobile ? 'relative' : 'absolute',
                  left: isMobile ? 'auto' : 'calc(50% + 30px)',
                  top: isMobile ? 'auto' : '0',
                  transform: isMobile ? 'none' : 'none',
                  willChange: 'auto'
                }}
                whileHover={{
                  scale: isMobile ? 1 : 1.01,
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
    </div>
  );
};

export default About;
