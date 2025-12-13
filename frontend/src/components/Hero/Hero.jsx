import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../../utils/constants';
import GeometricShapes from '../GeometricShapes/GeometricShapes';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const taglineVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="home" className="hero">
      <GeometricShapes />
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-text">
            <motion.h1 className="hero-title">
              <motion.span 
                className="hero-title-part-1"
                variants={titleVariants}
              >
                Welcome to
              </motion.span>
              <motion.span 
                className="highlight hero-title-part-2"
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.9,
                      delay: 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }
                }}
              >
                {COMPANY_INFO.name}
              </motion.span>
            </motion.h1>
            <motion.p 
              className="hero-tagline"
              variants={taglineVariants}
            >
              {COMPANY_INFO.tagline}
            </motion.p>
            <motion.p 
              className="hero-description"
              variants={descriptionVariants}
            >
              {COMPANY_INFO.values.join(' • ')}
            </motion.p>
            <motion.div 
              className="hero-cta"
              variants={ctaVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="products"
                  smooth={true}
                  duration={500}
                  className="btn btn-secondary"
                >
                  Explore Products
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="btn btn-secondary"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

