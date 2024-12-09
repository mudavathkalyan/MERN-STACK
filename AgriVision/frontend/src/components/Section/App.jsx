import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import backgroundImage from '../../assets/logo.png';
import farmerImage from '../../assets/Fig2_removepics.png';

import '../Section/Home.css';

const App = () => {
  return (
    <Router>
      <div className="app-container" style={styles.appContainer}>
        <div className="abc" style={styles.contentWrapper}>
          <div className="home" style={styles.textContainer}>
            <h4 className="main-heading">Your agricultural journey starts here
            </h4>
            <h6 className="sub-heading">connect today!</h6>
            {/* <button className="join-button"></button> */}
          </div>
          <div style={styles.imageContainer}>
            <img id="thatha" src={farmerImage} alt="Farmer" style={styles.farmerImage} />
          </div>
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
    justifyContent: 'center', // Centering between top and bottom
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    transform: 'translateY(-50px)', // Move up by 50px
  },
  textContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  farmerImage: {
    height: '750px', // Image height
    width: '800px',  // Image width
    maxHeight: '900px', // Prevent overflow
    maxWidth: '100%', // Fit within container
  },
  mainheading:{
      marginLeft: '20px', //
  },
};

export default App;
