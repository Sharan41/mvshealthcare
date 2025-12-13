import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { WHY_CHOOSE_US } from '../../utils/constants';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0); // Card width including gap (for scroll distance)
  const [actualCardWidth, setActualCardWidth] = useState(0); // Actual card width without gap (for centering)
  const [spacerHeight, setSpacerHeight] = useState(0);
  
  useEffect(() => {
    const calculateDimensions = () => {
      if (containerRef.current) {
        const firstCard = containerRef.current.querySelector('.feature-card');
        if (firstCard) {
          const cardRect = firstCard.getBoundingClientRect();
          const gap = 40;
          const calculatedCardWidth = cardRect.width + gap; // For scroll distance calculation
          const calculatedActualCardWidth = cardRect.width; // For centering calculation
          setCardWidth(calculatedCardWidth);
          setActualCardWidth(calculatedActualCardWidth);
          
          // Spacer height: enough to scroll through all 4 cards smoothly
          // Each card gets equal scroll space, plus extra space after last card for readability
          // Increase scroll space to ensure last card reaches center
          const cardScrollSpace = window.innerHeight * WHY_CHOOSE_US.length;
          const extraSpaceAfterLastCard = window.innerHeight * 0.8; // Increased from 0.5 to 0.8 for smoother completion
          const calculatedHeight = cardScrollSpace + extraSpaceAfterLastCard;
          setSpacerHeight(calculatedHeight);
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
    offset: ["start start", "end start"]
  });

  // Calculate horizontal translation to center each card one at a time
  // Each card should be centered when scroll progress is at its segment
  // We need to move from first card (centered) to last card (centered)
  // Add extra distance to ensure last card reaches perfect center
  const totalScrollDistance = cardWidth > 0 ? cardWidth * (WHY_CHOOSE_US.length - 1) + 144 : 0;
  
  // Calculate the progress ratio - account for extra space after last card
  // Total scroll space = 4 cards + 80% extra = 4.8 viewport heights
  // Cards animation should complete smoothly through all cards
  // Adjust to ensure last card reaches center: use more of the scroll progress for card animation
  const cardAnimationEndProgress = WHY_CHOOSE_US.length / (WHY_CHOOSE_US.length + 0.8);
  
  const x = useTransform(
    scrollYProgress,
    (latest) => {
      if (totalScrollDistance === 0 || isNaN(latest)) {
        // When cardWidth is 0, we can't calculate properly yet
        // Return 0 and let padding-left handle initial positioning
        return 0;
      }
      // Transform vertical scroll to horizontal movement
      // Ensure the animation completes fully so last card reaches center
      // Use the full scroll progress range to ensure smooth completion
      const normalizedProgress = Math.min(latest / cardAnimationEndProgress, 1.0);
      // Use smooth easing for natural movement (ease-in-out cubic)
      const easedProgress = normalizedProgress < 0.5
        ? 4 * normalizedProgress * normalizedProgress * normalizedProgress
        : 1 - Math.pow(-2 * normalizedProgress + 2, 3) / 2;
      return -easedProgress * totalScrollDistance;
    }
  );

  // Create opacity transforms for each card with smooth fading
  const cardOpacities = WHY_CHOOSE_US.map((_, index) => {
    return useTransform(
      scrollYProgress,
      (latest) => {
        // Normalize progress to account for extra space after last card
        const normalizedProgress = Math.min(latest / cardAnimationEndProgress, 1.0);
        
        // Calculate when each card should be centered
        // Card 0 centered at 0, Card 1 at 1/3, Card 2 at 2/3, Card 3 at 1.0
        const cardCenter = index / (WHY_CHOOSE_US.length - 1);
        
        const isLastCard = index === WHY_CHOOSE_US.length - 1;
        const isFirstCard = index === 0;
        
        // Handle first card at the very start
        if (isFirstCard && normalizedProgress <= 0) {
          return 1.0;
        }
        
        // Handle last card - keep it visible after animation completes
        if (isLastCard && normalizedProgress >= 1.0) {
          return 1.0;
        }
        
        // Calculate distance from card's center point
        const distanceFromCenter = Math.abs(normalizedProgress - cardCenter);
        // Each card should be visible over approximately 1/3 of the scroll range
        const visibilityRange = 1.0 / (WHY_CHOOSE_US.length - 1);
        const halfVisibilityRange = visibilityRange / 2;
        
        // Smooth opacity transition: full opacity at center, fade out as distance increases
        if (distanceFromCenter <= halfVisibilityRange) {
          // Within card's active zone - fade based on distance from center
          const normalizedDistance = distanceFromCenter / halfVisibilityRange;
          // Use quadratic easing for smoother transitions
          const easedDistance = normalizedDistance * normalizedDistance;
          // Fade from 1.0 at center to 0.2 at edges of active zone
          return Math.max(0.2, 1.0 - (easedDistance * 0.8));
        } else {
          // Outside card's active zone - fade out more aggressively
          const distanceBeyond = distanceFromCenter - halfVisibilityRange;
          const maxFadeDistance = halfVisibilityRange * 0.8;
          const fadeProgress = Math.min(distanceBeyond / maxFadeDistance, 1.0);
          // Smooth fade from 0.2 to 0.1
          const easedFade = fadeProgress * fadeProgress;
          return Math.max(0.1, 0.2 - (easedFade * 0.1));
        }
      }
    );
  });

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

  return (
    <div ref={wrapperRef} className="why-choose-us-wrapper">
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
            viewport={{ once: true, amount: 0.3 }}
          >
            Why Choose Us
          </motion.h2>
          
          <div className="features-carousel-wrapper">
            <motion.div 
              ref={containerRef}
              className="features-container"
              style={{ 
                x,
                paddingLeft: actualCardWidth > 0 ? `calc(50vw - ${actualCardWidth / 2}px)` : '50vw'
              }}
            >
              {WHY_CHOOSE_US.map((feature, index) => {
                // Use useMotionValue to create a reactive opacity that can be overridden by hover
                return (
                  <motion.div 
                    key={feature.title}
                    className="feature-card"
                    style={{ opacity: cardOpacities[index] }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      // Reset to the scroll-based opacity
                      e.currentTarget.style.opacity = '';
                    }}
                  >
                    <div className="feature-icon">
                      <div className="organic-shape-container">
                        <div className="organic-shape organic-shape-1"></div>
                        <div className="organic-shape organic-shape-2"></div>
                        <div className="organic-shape organic-shape-3"></div>
                      </div>
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Spacer creates scroll space for horizontal animation */}
      <div 
        className="why-choose-us-spacer"
        style={{ height: `${spacerHeight}px` }}
      ></div>
    </div>
  );
};

export default WhyChooseUs;

