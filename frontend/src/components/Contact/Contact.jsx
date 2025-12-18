import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../../utils/constants';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    productInterest: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Formspree integration
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('productInterest', formData.productInterest);
    formDataToSend.append('message', formData.message);

    try {
      const response = await fetch('https://formspree.io/f/mpqaavpq', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you for your inquiry! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          productInterest: ''
        });
      } else {
        const data = await response.json();
        if (data.errors) {
          alert('There was an error submitting the form. Please try again.');
        } else {
          alert('Thank you for your inquiry! We will contact you soon.');
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
            productInterest: ''
          });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const emailLink = `mailto:${COMPANY_INFO.contact.email}`;
  const callLink = `tel:${COMPANY_INFO.contact.phone}`;

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      x: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section id="contact" className="contact section geometric-bg geometric-pattern-dots">
      <div className="container">
        <motion.h2 
          className="section-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: isMobile ? 0.1 : 0.3, margin: isMobile ? "0px" : "0px" }}
        >
          Get in Touch
        </motion.h2>
        
        <motion.div 
          className="contact-content"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: isMobile ? 0.1 : 0.2, margin: isMobile ? "0px" : "0px" }}
        >
          <motion.div 
            className="contact-info"
            variants={cardVariants}
          >
            <motion.div 
              className="info-card"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <FaMapMarkerAlt className="info-icon" />
              <h3>Address</h3>
              <p>
                {COMPANY_INFO.address.line1}<br />
                {COMPANY_INFO.address.line2}<br />
                {COMPANY_INFO.address.district}<br />
                {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}<br />
                {COMPANY_INFO.address.country}
              </p>
            </motion.div>

            <motion.div 
              className="info-card"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <FaPhone className="info-icon contact-phone-icon" />
              <h3>Phone</h3>
              <a href={callLink}>{COMPANY_INFO.contact.phone}</a>
            </motion.div>

            <motion.div 
              className="info-card"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <FaEnvelope className="info-icon" />
              <h3>Email</h3>
              <a href={emailLink}>{COMPANY_INFO.contact.email}</a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="contact-form-wrapper"
            variants={formVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="geometric-focus"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="geometric-focus"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="geometric-focus"
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="geometric-focus"
                />
              </div>

              <div className="form-group">
                <label htmlFor="productInterest">Product Interest</label>
                <input
                  type="text"
                  id="productInterest"
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleChange}
                  className="geometric-focus"
                  placeholder="Which products are you interested in?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="geometric-focus"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-ripple">
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

