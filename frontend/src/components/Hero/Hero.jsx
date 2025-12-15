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
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -30, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const taglineVariants = {
    hidden: { opacity: 0, x: -30, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.1,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, x: -30, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.1,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.3,
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1]
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
          <div className="hero-text-wrapper">
            <div className="hero-text">
              <motion.h1 
                className="hero-title"
                variants={titleVariants}
              >
                <span className="hero-title-line1">MVS HEALTHCARE</span>
                <span className="hero-title-line2">PVT. LTD.</span>
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
            </div>
          </div>
          <motion.div 
            className="hero-image-wrapper"
            variants={imageVariants}
          >
            <div className="hero-image-container">
              <img 
                src="/images/hero-banner.png" 
                alt="MVS Healthcare Products"
                className="hero-banner-image"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

