import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import productsData from '../../data/products.json';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const sectionRef = useRef(null);
  const touchStartMap = useRef(new Map()); // Map to track touch starts per card
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardFlip = (productId, event) => {
    if (!isMobile) return; // Only handle tap on mobile
    
    // Stop event propagation to prevent conflicts with other cards
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    // Use functional update to ensure we're working with the latest state
    setFlippedCards(prev => {
      // Create a new Set to avoid mutation
      const newSet = new Set(prev);
      
      // Toggle the flip state for this specific card only
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      
      return newSet;
    });
  };
  
  
  const categories = ['All', ...productsData.categories];
  
  const filteredProducts = selectedCategory === 'All' 
    ? productsData.products 
    : productsData.products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Scroll-based animation for section entrance (scale only, no opacity change)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end start"]
  });

  const sectionScale = useTransform(scrollYProgress, [0, 0.3], [0.98, 1]);

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      y: 20,
      scale: 0.95,
      filter: 'blur(6px)'
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1
      }
    }
  };

  // Enhanced filter button animation with spring physics
  const filterButtonVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.92,
      filter: 'blur(3px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 22,
        duration: 0.7
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.06,
        delayChildren: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };


  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
      filter: 'blur(10px)',
      rotateY: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { 
          duration: 0.6, 
          ease: [0.4, 0, 0.2, 1],
          delay: 0.1
        },
        y: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
        scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
        filter: { duration: 0.5 },
        rotateY: { duration: 0.6 }
      }
    }
  };

  // Generate product icon/placeholder based on category (fallback)
  const getProductIcon = (category) => {
    const icons = {
      'Disposable Syringes': '💉',
      'Infusion & Transfusion': '🩸',
      'Urology': '🔬',
      'Wound Care': '🩹',
      'Hospital Supplies': '🏥',
      'Hospital Apparels': '👔',
      'Kits': '📦'
    };
    return icons[category] || '📋';
  };

  // Get product image path based on product ID
  const getProductImage = (productId) => {
    const imageMap = {
      'disposable-syringes': '/images/disposable-syringes.png',
      'infusion-sets': '/images/infusion-sets.png',
      'iv-cannula': '/images/iv-cannula.png',
      'urine-collection-bag': '/images/urine-collection-bag.png',
      'gauze-sponge': '/images/gauze-sponge.png',
      'gauze-cloth': '/images/gauze-cloth.png',
      'gamjee-roll': '/images/gamjee-roll.png',
      'gamjee-roll-cotton': '/images/gamjee-roll-cotton.png',
      'surgical-towel': '/images/surgical-towel.png',
      'bed-sheet-sets': '/images/bed-sheet-sets.png',
      'surgical-gowns': '/images/surgical-gowns.png',
      'dressing-kit': '/images/dressing-kit.png',
      'surgical-kit': '/images/surgical-kit.png',
      'hiv-kit': '/images/hiv-kit.png',
      'orthopaedic-kit': '/images/orthopaedic-kit.png'
    };
    return imageMap[productId] || null;
  };

  return (
    <motion.section 
      id="products" 
      className="products section"
      ref={sectionRef}
      style={{
        scale: sectionScale
      }}
    >
      {/* Geometric Shapes Background */}
      <div className="products-geometric-shapes">
        {/* Floating Circle */}
        <div className="products-shape products-shape-circle"></div>
        {/* Floating Square */}
        <div className="products-shape products-shape-square"></div>
        {/* Floating Rectangle */}
        <div className="products-shape products-shape-rectangle"></div>
      </div>

      <div className="container">
        <div className="products-header-wrapper">
          <motion.h2 
            className="section-title products-title"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ 
              once: true, 
              amount: isMobile ? 0.15 : 0.1, 
              margin: isMobile ? "0px" : "-200px" 
            }}
          >
            Our Products
          </motion.h2>
        </div>
        
        <motion.div 
          className="products-filter"
          variants={filterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true, 
            amount: isMobile ? 0.15 : 0.1, 
            margin: isMobile ? "0px" : "-200px" 
          }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`filter-btn btn-ripple ${selectedCategory === category ? 'active' : ''}`}
              variants={filterButtonVariants}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <motion.div 
            className="products-grid"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: window.innerWidth <= 968 ? 0.1 : 0.2, margin: "0px" }}
            key={selectedCategory}
          >
            {filteredProducts.map((product, index) => {
              const isFlipped = flippedCards.has(product.id);
              return (
                <motion.div 
                  key={product.id} 
                  className="product-card-wrapper"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: window.innerWidth <= 968 ? 0.1 : 0.2, margin: "0px" }}
                  onClick={(e) => {
                    // Prevent wrapper from interfering with card clicks
                    e.stopPropagation();
                  }}
                >
                  <div 
                    className={`product-card ${isFlipped ? 'flipped' : ''}`}
                    data-product-id={product.id}
                    onClick={(e) => {
                      // Click handler for both mobile and desktop
                      e.stopPropagation();
                      e.preventDefault();
                      handleCardFlip(product.id, e);
                    }}
                    onTouchStart={(e) => {
                      // Track touch start position per card
                      if (isMobile) {
                        const touch = e.touches[0];
                        if (touch) {
                          touchStartMap.current.set(product.id, {
                            x: touch.clientX,
                            y: touch.clientY,
                            time: Date.now()
                          });
                        }
                      }
                    }}
                    onTouchEnd={(e) => {
                      // Mobile touch handler - primary handler for mobile devices
                      if (!isMobile) return;
                      
                      e.stopPropagation();
                      e.preventDefault();
                      
                      const touchStart = touchStartMap.current.get(product.id);
                      
                      // If we have touch start data for this card
                      if (touchStart && e.changedTouches && e.changedTouches[0]) {
                        const touch = e.changedTouches[0];
                        
                        // Calculate movement distance
                        const deltaX = Math.abs(touch.clientX - touchStart.x);
                        const deltaY = Math.abs(touch.clientY - touchStart.y);
                        const deltaTime = Date.now() - touchStart.time;
                        
                        // Only flip if it's a tap (not a swipe) - movement < 30px and time < 800ms
                        if (deltaX < 30 && deltaY < 30 && deltaTime < 800) {
                          handleCardFlip(product.id, e);
                        }
                      } else {
                        // Fallback: if no touch start data, just flip (might be a quick tap)
                        handleCardFlip(product.id, e);
                      }
                      
                      // Clean up touch start data for this card
                      touchStartMap.current.delete(product.id);
                    }}
                    onTouchCancel={(e) => {
                      // Clean up touch start if touch is cancelled
                      if (isMobile) {
                        touchStartMap.current.delete(product.id);
                      }
                    }}
                    style={{ 
                      cursor: isMobile ? 'pointer' : 'pointer', 
                      touchAction: isMobile && isFlipped ? 'pan-y' : 'manipulation' 
                    }}
                  >
                    {/* Front of Card - Image and Name */}
                    <div className="product-card-front">
                      <div className="product-image-container">
                        {getProductImage(product.id) ? (
                          <img 
                            src={getProductImage(product.id)} 
                            alt={product.name}
                            className="product-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="product-icon-fallback" style={{ display: getProductImage(product.id) ? 'none' : 'flex' }}>
                          {getProductIcon(product.category)}
                        </div>
                      </div>
                      <div className="product-card-front-content">
                        <h3 className="product-name">{product.name}</h3>
                        {product.subtitle && <p className="product-subtitle">{product.subtitle}</p>}
                        <div className="product-category-badge">{product.category}</div>
                        {isMobile && (
                          <div className="tap-to-flip-indicator">
                            <span>Tap to see details</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Back of Card - Product Details */}
                    <div 
                      className="product-card-back"
                      onTouchStart={(e) => {
                        // Track touch start for card back - allow scrolling
                        if (isMobile && isFlipped) {
                          const touch = e.touches[0];
                          if (touch) {
                            touchStartMap.current.set(`${product.id}-back`, {
                              x: touch.clientX,
                              y: touch.clientY,
                              time: Date.now()
                            });
                          }
                        }
                      }}
                      onTouchMove={(e) => {
                        // Allow scrolling - don't prevent default
                        if (isMobile && isFlipped) {
                          // Let scrolling happen naturally
                        }
                      }}
                      onTouchEnd={(e) => {
                        // Handle flip on card back only if it's a tap (not scroll)
                        if (!isMobile || !isFlipped) return;
                        
                        const touchStart = touchStartMap.current.get(`${product.id}-back`);
                        
                        if (touchStart && e.changedTouches && e.changedTouches[0]) {
                          const touch = e.changedTouches[0];
                          const deltaX = Math.abs(touch.clientX - touchStart.x);
                          const deltaY = Math.abs(touch.clientY - touchStart.y);
                          const deltaTime = Date.now() - touchStart.time;
                          
                          // Only flip if minimal movement (tap, not scroll) - movement < 10px
                          if (deltaX < 10 && deltaY < 10 && deltaTime < 300) {
                            e.stopPropagation();
                            e.preventDefault();
                            handleCardFlip(product.id, e);
                          }
                        }
                        
                        touchStartMap.current.delete(`${product.id}-back`);
                      }}
                    >
                      <div 
                        className="product-card-back-content"
                        style={{ touchAction: 'pan-y' }}
                        onTouchStart={(e) => {
                          // Track touch start for scrolling detection
                          if (isMobile && isFlipped) {
                            const touch = e.touches[0];
                            if (touch) {
                              touchStartMap.current.set(`${product.id}-content`, {
                                x: touch.clientX,
                                y: touch.clientY,
                                time: Date.now(),
                                scrollTop: e.currentTarget.scrollTop
                              });
                            }
                          }
                        }}
                        onTouchMove={(e) => {
                          // Allow scrolling - check if user is actually scrolling
                          if (isMobile && isFlipped) {
                            const touchStart = touchStartMap.current.get(`${product.id}-content`);
                            if (touchStart) {
                              const touch = e.touches[0];
                              const deltaY = Math.abs(touch.clientY - touchStart.y);
                              const scrollDelta = Math.abs(e.currentTarget.scrollTop - touchStart.scrollTop);
                              
                              // If user is scrolling, prevent flip
                              if (deltaY > 5 || scrollDelta > 0) {
                                touchStartMap.current.delete(`${product.id}-content`);
                              }
                            }
                          }
                        }}
                      >
                        <h3 className="product-name-back">{product.name}</h3>
                        {product.subtitle && <p className="product-subtitle-back">{product.subtitle}</p>}
                        
                        <p className="product-description">{product.description}</p>
                        
                        {product.features && (
                          <ul className="product-features">
                            {product.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        )}
                        
                        {product.contents && (
                          <div className="product-contents">
                            <h4>Contents:</h4>
                            <ul>
                              {product.contents.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {product.specifications && (
                          <div className="product-specs">
                            {Object.entries(product.specifications).map(([key, value]) => {
                              // Format key: convert camelCase to Title Case
                              const formatKey = (str) => {
                                let formatted = str
                                  .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                                  .trim()
                                  .split(' ')
                                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                  .join(' ');
                                
                                // Normalize specific keys to consistent format
                                if (formatted.toLowerCase().includes('needle size')) {
                                  formatted = 'Needle Size'; // Always use singular
                                }
                                if (formatted.toLowerCase().includes('pack type')) {
                                  formatted = 'Pack Type';
                                }
                                if (formatted.toLowerCase().includes('size range')) {
                                  formatted = 'Size Range';
                                }
                                
                                return formatted;
                              };
                              
                              const formattedKey = formatKey(key);
                              
                              // Special handling for size ranges
                              if (key.toLowerCase().includes('sizerange') || key.toLowerCase().includes('size range')) {
                                return (
                                  <div key={key} className="spec-item spec-item-size-range">
                                    <div className="size-range-header">
                                      <strong className="size-range-label">{formattedKey}:</strong>
                                    </div>
                                    <div className="size-range-content">
                                      {typeof value === 'object' 
                                        ? Array.isArray(value) 
                                          ? (
                                            <div className="size-range-list">
                                              {value.map((item, idx) => (
                                                <div key={idx} className="size-range-item">
                                                  <span className="size-range-badge">{item}</span>
                                                </div>
                                              ))}
                                            </div>
                                          )
                                          : (
                                            <div className="size-range-object">
                                              {Object.entries(value).map(([k, v], idx) => (
                                                <div key={idx} className="size-range-color-item">
                                                  <span className="size-range-color-label">{k}:</span>
                                                  <span className="size-range-color-value">{v}</span>
                                                </div>
                                              ))}
                                            </div>
                                          )
                                        : (
                                          <div className="size-range-single">
                                            <span className="size-range-badge">{value}</span>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                );
                              }
                              
                              // Special handling for sterile/nonSterile (Gauze Swab)
                              if (key.toLowerCase() === 'sterile' || key.toLowerCase() === 'nonsterile') {
                                const categoryLabel = key.toLowerCase() === 'sterile' ? 'STERILE' : 'NON - STERILE';
                                return (
                                  <div key={key} className="spec-item spec-item-category">
                                    <div className="category-header">
                                      <strong className="category-label">{categoryLabel}</strong>
                                    </div>
                                    <div className="category-content">
                                      {Array.isArray(value) && value.map((item, idx) => (
                                        <div key={idx} className="category-item">
                                          <span className="category-badge">{item}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }
                              
                              // Default handling for other specifications
                              return (
                                <div key={key} className="spec-item">
                                  <strong>{formattedKey}:</strong>{' '}
                                  {typeof value === 'object' 
                                    ? Array.isArray(value) 
                                      ? value.join(' - ') // Use hyphen instead of comma
                                      : Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(' - ') // Use hyphen instead of comma
                                    : value}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Download Buttons */}
        <motion.div 
          className="products-download-buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.0,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/MVS-Brochure.pdf"
              download="MVS-Brochure.pdf"
              className="btn btn-secondary"
            >
              Download MVS Brochure
            </a>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/MVS-Price-List.pdf"
              download="MVS-Price-List.pdf"
              className="btn btn-secondary"
            >
              Download MVS Price List
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Products;

