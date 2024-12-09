import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './index.css'; 
import backgroundImage from './assets/logo.png'; 
import farmerImage from './assets/Fig2_removepics.png'; 
import logo1 from './assets/logo1.png';
import Carousel from './components/Carousel';
import crop from './assets/Crop.jpeg';
import fertiliser from './assets/Fertiliser.jpg';
import multi from './assets/MULTI.jpg';
import community from './assets/FarmerCommunity.jpeg';
import Testomonial from './components/Testomonial';
import Seed from './assets/Seed.jpeg';
import Weather from './assets/Weather.jpeg';
import Simplea from './components/Simplae';
import Footer from './components/Footer';
import Space from './components/Space';

const App = () => {
  const cards = [
    {
      image: crop, 
      title: 'Crop disease detection',
      description: 'Lorem ipsum dolor sit amet elit food, consectetur adipiscing, sed eiusmod tempor dolor Fresh food.'
    },
    {
      image: fertiliser,
      title: 'Fertiliser Recommendation',
      description: 'Lorem ipsum dolor sit amet elit food, consectetur adipiscing, sed eiusmod tempor dolor Fresh food.'
    },
    {
      image: multi,
      title: 'Crop Recommendation',
      description: 'Lorem ipsum dolor sit amet elit food, consectetur adipiscing, sed eiusmod tempor dolor Fresh food.'
    },
    {
      image: community,
      title: 'Farmer Community',
      description: 'Lorem ipsum dolor sit amet elit food, consectetur adipiscing, sed eiusmod tempor dolor Healthy living.'
    },
    {
      image: Seed,
      title: 'Seed Detection',
      description: 'Lorem ipsum dolor sit amet elit food, consectetur adipiscing, sed eiusmod tempor dolor Natural products.'
    },
    {
      image: Weather,
      title: 'Weather Forcast',
      description: 'Lorem ipsum dolor sit amet elit food, consectetur adipiscing, sed eiusmod tempor dolor Natural products.'
    },
  ];

  const MotionSection = ({ children }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    React.useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <Router>
      <div className="app-container" style={styles.appContainer}>
        <div className="navbar">
          <img src={logo1} alt="Dhanya Sarathi" className="logo" />
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <button className="login-button">Login</button>
            <button className="signup-button">Sign up</button>
          </div>
        </div>
        <div style={styles.content}>
          <img src={farmerImage} alt="Farmer" style={styles.farmerImage} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <MotionSection>
          <Space />
        </MotionSection>

        <MotionSection>
          <Simplea />
        </MotionSection>

        <MotionSection>
          <div className="carousel-wrapper" style={styles.carouselWrapper}>
            <Carousel cards={cards} />
          </div>
        </MotionSection>

        <MotionSection>
          <div className="testomonial-wrapper" style={styles.testomonialWrapper}>
            <Testomonial />
          </div>
        </MotionSection>

        <MotionSection>
          <Contact />
        </MotionSection>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '20px',
  },
  farmerImage: {
    position: 'absolute',
    right: '40px',
    top: '-100px',
    bottom: '70px',
    height: '700px',
  },
  carouselWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0',
  },
  testomonialWrapper: {
    width: '100%',
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
};

export default App;
