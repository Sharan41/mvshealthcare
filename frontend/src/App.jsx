import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Products from './components/Products/Products'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import FloatingActionButtons from './components/FloatingActionButtons/FloatingActionButtons'
import './styles/global.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  )
}

export default App
