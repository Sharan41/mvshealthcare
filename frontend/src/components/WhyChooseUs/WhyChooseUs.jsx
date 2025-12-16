import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { WHY_CHOOSE_US } from '../../utils/constants';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? WHY_CHOOSE_US.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === WHY_CHOOSE_US.length - 1 ? 0 : prev + 1));
  };

  // Touch/swipe handlers for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    if (!isMobile) return;
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (!isMobile) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!isMobile || !touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handleCardClick = (clickedCardIndex, clickedPosition) => {
    if (isMobile) {
      // On mobile, clicking a card makes it active (it's already at position 0)
      if (clickedPosition !== 0) {
        setDirection(clickedPosition > 0 ? 1 : -1);
        setCurrentIndex(clickedCardIndex);
      }
    } else {
      // On desktop, clicking a card should make it the center (position 1)
      if (clickedPosition === 0) {
        // Left card clicked - move previous
        setDirection(-1);
        setCurrentIndex((clickedCardIndex - 1 + WHY_CHOOSE_US.length) % WHY_CHOOSE_US.length);
      } else if (clickedPosition === 1) {
        // Center card clicked - already active, do nothing
        return;
      } else if (clickedPosition === 2) {
        // Right card clicked - make it the center
        setDirection(1);
        setCurrentIndex((clickedCardIndex - 1 + WHY_CHOOSE_US.length) % WHY_CHOOSE_US.length);
      }
    }
  };

  // Calculate visible cards (show 2-3 cards on desktop)
  const getVisibleCards = () => {
    const cards = [];
    const visibleCount = isMobile ? 1 : 3; // Show 3 cards on desktop, 1 on mobile
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % WHY_CHOOSE_US.length;
      cards.push({
        ...WHY_CHOOSE_US[index],
        index,
        position: i
      });
    }
    return cards;
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Calculate slide distance (one card width + gap)
  const cardWidth = 380; // Fixed card width
  const cardGap = 30; // Gap between cards
  const slideDistance = cardWidth + cardGap;

  const containerVariants = {
    animate: {
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="why-choose-us-wrapper">
      <section 
        id="why-choose-us" 
        className="why-choose-us section geometric-pattern-lines"
      >
        {/* Geometric Shapes Background */}
        <div className="why-choose-us-geometric-shapes">
          {/* Striped Triangle */}
          <div className="why-shape striped-triangle">
            <div className="striped-triangle-inner"></div>
          </div>
          
          {/* Empty Square */}
          <div className="why-shape empty-square"></div>
        </div>
        
        <div className="container">
          <motion.h2 
            className="section-title"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.1 : 0.3, margin: isMobile ? "0px" : "0px" }}
          >
            Why Choose Us
          </motion.h2>
          
          <div className="features-carousel-wrapper">
            {/* Left Arrow */}
            <button
              className={`carousel-arrow carousel-arrow-left ${isMobile ? 'carousel-arrow-mobile' : ''}`}
              onClick={handlePrevious}
              aria-label="Previous card"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div 
              className="features-container-wrapper"
              ref={containerRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <motion.div 
                className="features-container"
                key={currentIndex}
                variants={containerVariants}
                initial={direction > 0 ? { x: slideDistance } : { x: -slideDistance }}
                animate="animate"
              >
                {getVisibleCards().map((card, idx) => {
                  // Center card (index 1) is active on desktop, first card (index 0) on mobile
                  const isActive = isMobile ? idx === 0 : idx === 1;
                  return (
                    <motion.div 
                      key={`${card.index}-${currentIndex}`}
                      className={`feature-card ${isActive ? 'feature-card-active' : 'feature-card-inactive'}`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.5,
                        y: isActive ? 0 : 10
                      }}
                      transition={{ 
                        duration: 0.7,
                        delay: idx * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      onClick={() => handleCardClick(card.index, idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="feature-icon">
                        <div className="organic-shape-container">
                          <div className="organic-shape organic-shape-1"></div>
                          <div className="organic-shape organic-shape-2"></div>
                          <div className="organic-shape organic-shape-3"></div>
                        </div>
                      </div>
                      <h3 className={isActive ? 'feature-card-title-active' : ''}>{card.title}</h3>
                      <p>{card.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Arrow */}
            <button
              className={`carousel-arrow carousel-arrow-right ${isMobile ? 'carousel-arrow-mobile' : ''}`}
              onClick={handleNext}
              aria-label="Next card"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;

