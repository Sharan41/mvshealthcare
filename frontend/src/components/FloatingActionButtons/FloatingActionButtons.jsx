import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { COMPANY_INFO } from '../../utils/constants';
import './FloatingActionButtons.css';

const FloatingActionButtons = () => {
  const whatsappLink = `https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello, I am interested in your products...')}`;
  const callLink = `tel:${COMPANY_INFO.contact.phone}`;

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="floating-action-buttons">
      {/* WhatsApp Button - Bottom Right */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-button fab-whatsapp"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        aria-label="WhatsApp Us"
      >
        <FaWhatsapp />
      </motion.a>

      {/* Call Button - Bottom Left */}
      <motion.a
        href={callLink}
        className="fab-button fab-call"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        aria-label="Call Us"
      >
        <FaPhone style={{ transform: 'rotate(90deg)' }} />
      </motion.a>
    </div>
  );
};

export default FloatingActionButtons;

