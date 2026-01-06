# MVS Healthcare Website

A modern single-page application (SPA) catalogue website for MVS Healthcare - a leading manufacturer and supplier of medical disposables and healthcare products.

## 🚀 Features

- **Single-Page Application** with smooth scroll navigation
- **Product Catalogue** showcasing 15+ product categories
- **Responsive Design** optimized for all devices
- **Modern UI** with geometric design elements
- **Contact Integration** with WhatsApp, Call, and Email
- **Performance Optimized** with React and Vite

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **React Scroll** - Smooth scrolling
- **EmailJS** - Contact form email service
- **React Icons** - Icon library

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your EmailJS credentials:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

   Get these from [EmailJS Dashboard](https://dashboard.emailjs.com/)

## 🏃 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── Navbar/
│   │   ├── Products/
│   │   └── WhyChooseUs/
│   ├── data/            # Product data (JSON)
│   ├── styles/          # Global styles and CSS variables
│   ├── utils/           # Utility functions and constants
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── render.yaml          # Render deployment config
```

## 🎨 Brand Colors

- **Primary Blue**: `#3d509d`
- **Primary Green**: `#545c37`
- **Beige**: `#e7e5d7`
- **Sage Green**: `#b0bca1`
- **Dusty Blue**: `#bdd3ce`
- **Cream**: `#f6f6f4`

## 📱 Sections

1. **Hero** - Landing section with company tagline
2. **About** - Mission, Vision, and company information
3. **Products** - Product catalogue with categories
4. **Why Choose Us** - Value propositions
5. **Contact** - Contact form, address, and integration links
6. **Footer** - Additional links and information

## 🚀 Deployment on Render

1. **Connect Repository** to Render
2. **Create Static Site** service
3. **Configure:**
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment Variables: Add EmailJS keys
4. **Deploy**

Or use the `render.yaml` file for automatic configuration.

## 📞 Contact Integration

- **WhatsApp**: Click-to-chat link
- **Phone**: Click-to-call link
- **Email**: Contact form with EmailJS

## 📄 License

ISC

## 👥 Company Information

**MVS Healthcare**
- Address: D.no.2-5-2, First Floor, Kummari Vari Street, Kavali, Dist. SPSR Nellore, Andhra Pradesh - 524201, India
- Phone: +91 8074490300
- Email: mvshealthcarepvt@gmail.com
