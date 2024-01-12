import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import BackgroundVideo from './BackgroundVideo.js';
import logo from './logo.png'
import './styles.css'
import GoogleDocViewer from './GoogleDocViewer.js';
import axios from 'axios';
import Container from './Container.js';
import Gallery from './Gallery/Gallery.js'


const App = () => {

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    /*
          fetch("/.netlify/functions/googleApiProxy")
      .then(response => response.json())
      .then(data => {
        // put data into array here
      });
    */
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='page'>
      <div className='top-border'>
        <img className='logo' src={logo} />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '20px', justifyContent: 'space-between' }}>
          <h5>Menu</h5>
          <h5>Our Story</h5>
          <h5>Order Online</h5>
          <h5>Reserve a Table</h5>
        </div>
      </div>

      <BackgroundVideo />

      <Parallax translateY={[0, -10]}>
        <Container backgroundColor='glass'>
          <h1 style={{ color: 'white', fontSize: '60px' }}>Welcome</h1>
          {/* this needs to contact backend in order to get message to display */}
          <h2 style={{ color: 'white', fontSize: '30px', textAlign: 'center' }}>Simcha is open Tuesday - Saturday 4pm - 10pm, Sunday 10am - 2pm.</h2>
          <button className='bottom-button'>
            <div style={{ color: 'white', fontSize: '50px' }}>↓</div> {/* Replace with an appropriate arrow icon */}
          </button>
        </Container>
      </Parallax>

      <Parallax speed={15} opacity={[2.5, 0]} translateY={[60, 0]}>
        <Container backgroundColor='orange'>
            <GoogleDocViewer />
        </Container>
      </Parallax>
      
      <Parallax speed={15} opacity={[3.8, 0]}>
        <div style={{paddingTop:'500px'}} />
        <Container backgroundColor='orange'>
          <div>
            <Gallery />
          </div>
        </Container>
      </Parallax>

      <Parallax speed={15} opacity={[3.8, 0]}>
        <div style={{paddingTop:'300px', marginBottom:'50vh'}} />
        <Container backgroundColor='orange'>
          <div>
            <h3>Hungry for more? Place a reservation!</h3>
            <button>Reserve a Table</button>
            <h3>Follow us on our Social Media:</h3>
            <button>IG</button>
            <button>FB</button>
            <h3>Or submit an inquiry below:</h3>
            <input type='text'></input>
            <input type='text'></input>
            <input type='text'></input>
            <button>Submit</button>
          </div>
        </Container>
      </Parallax>

      <div style={{paddingTop:'300px'}} />

    </div>

  );
}

export default App;
