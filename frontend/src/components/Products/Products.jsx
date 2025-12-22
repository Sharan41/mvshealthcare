import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import productsData from '../../data/products.json';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);
  
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
      x: -100,
      scale: 0.9,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }
    }
  };

  // Enhanced filter button animation with spring physics
  const filterButtonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.4
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
            viewport={{ once: true, amount: 0.05, margin: "-300px" }}
          >
            Our Products
          </motion.h2>
        </div>
        
        <motion.div 
          className="products-filter"
          variants={filterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05, margin: "-300px" }}
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
            viewport={{ once: true, amount: 0.2, margin: "0px" }}
            key={selectedCategory}
          >
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                className="product-card-wrapper"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2, margin: "0px" }}
              >
                <div className="product-card">
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
                    </div>
                  </div>

                  {/* Back of Card - Product Details */}
                  <div className="product-card-back">
                    <div className="product-card-back-content">
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
                              
                              return formatted;
                            };
                            
                            const formattedKey = formatKey(key);
                            
                            return (
                              <div key={key} className="spec-item">
                                <strong>{formattedKey}:</strong>{' '}
                                {typeof value === 'object' 
                                  ? Array.isArray(value) 
                                    ? value.join(', ') 
                                    : Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ')
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
            ))}
          </motion.div>
        )}

        {/* Download Buttons */}
        <motion.div 
          className="products-download-buttons"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
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

