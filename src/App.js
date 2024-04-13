import React, { useState, useEffect, useRef } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { Link } from 'react-router-dom'
import scrollTo from 'animated-scroll-to';
import BackgroundVideo from './BackgroundVideo.js';
import logo from './logo.png'
import './styles.css'
import GoogleDocViewer from './GoogleDocViewer.js';
import axios from 'axios';
import Container from './Container.js';
import Gallery from './Gallery/Gallery.js';
import Popup from './Popup.js';


const App = () => {

  const menuRef = useRef(null);

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [isOpen, setIsOpen] = useState(true); //used for controlling pop up

  const [menuType, setMenuType] = useState('dinner');

  const handleMenuChange = (event) => {
    setMenuType(event.target.value);
  };

  const OpenPopUp = () => {
    setIsOpen(true)
  }

  const menus = {
    dinner: 'https://docs.google.com/document/d/e/2PACX-1vRCV6KHuU5op_3bWmE9bgi5gFp-3WMAqNomPmGE9dN8ay6FvlxggoD9T9bpEjmplfsPedLAL7J7ZsC1/pub',
    brunch: '', // Your brunch menu URL
    tt: '', // Taco Tuesday URL
    kid: '',
  };

  const documentURL = menus[menuType] || '';

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

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  //vertical offset may need to change depending on screen size
  const handleMenuClick = () => {
    if (menuRef.current) {
        scrollTo(menuRef.current, { speed:800, verticalOffset:-350, maxDuration: 450 });
    }
};

  return (
    <div className='page'>

      <Popup className="popup" isOpen={isOpen} setIsOpen={() => { setIsOpen(false); }}>
        <div>
          <h2>
            Simcha will be closed tonight, Wednesday, 4/3/2024. Sorry for the inconvenience!
          </h2>
        </div>
      </Popup>

      <div className='top-border'>
        <img className='logo' src={logo} />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '20px', justifyContent: 'space-between' }}>
        <h5 onClick={handleMenuClick} style={{ cursor: 'pointer' }}>Menu</h5>
          <h5><Link to='/aboutus'>About Us</Link></h5>
          <h5>
            <a href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=26f53f2a-8d84-469d-9df9-1760d0d64bd4" target='_blank'>
              Order Online
            </a>
          </h5>

          <h5>
            <a href="https://www.foodbooking.com/ordering/restaurant/menu/reservation?restaurant_uid=26f53f2a-8d84-469d-9df9-1760d0d64bd4&reservation=true" target='_blank'>
              Reserve a Table
            </a>
          </h5>


        </div>
      </div>

      <BackgroundVideo />

      <Parallax translateY={[0, -10]}>
        <Container backgroundColor='glass'>
          <h1 style={{ color: 'black', fontSize: '60px' }}>Welcome</h1>
          {/* this needs to contact backend in order to get message to display */}
          <h2 style={{ color: 'black', fontSize: '30px', textAlign: 'center' }}>Simcha is open Tuesday - Saturday 4pm - 10pm, Sunday 10am - 2pm.</h2>
          <button className='bottom-button'>
            <div style={{ color: 'black', fontSize: '50px' }}>↓</div> {/* Replace with an appropriate arrow icon */}
          </button>
        </Container>
      </Parallax>

      <Parallax speed={15} opacity={[2.5, 0]} translateY={[60, 0]}>
        <Container backgroundColor='orange' id = 'menu'>

        <div ref={menuRef}>
    <select value={menuType} onChange={handleMenuChange} className="menu-select" style={{ marginBottom: "50px", alignSelf: "center" }}>
        <option value="dinner">Dinner Menu</option>
        <option value="brunch">Brunch Menu</option>
        <option value="drink">Drink Menu</option>
        <option value="tt">Taco Tuesday</option>
        <option value="kid">Kid's Menu</option>
    </select>
</div>

          <button onClick={() => openInNewTab('https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=26f53f2a-8d84-469d-9df9-1760d0d64bd4')} style={{ marginBottom: "50px", alignSelf: "center" }}>Click here to order online!</button>
          <GoogleDocViewer documentURL={documentURL} />
        </Container>
      </Parallax>

      <Parallax speed={15} opacity={[3.5, 0]}>
        <div style={{ paddingTop: '500px' }} />
        <Container backgroundColor='orange'>
          <div>
            <Gallery />
          </div>
        </Container>
      </Parallax>

      <Parallax speed={15} opacity={[3.8, 0]}>
        <div style={{ paddingTop: '300px', marginBottom: '50vh' }} />
        <Container backgroundColor='orange'>
          <div style={{ textAlign: 'center' }}>
            <h3>Hungry for more? Place a reservation or call us!</h3>
            <button>Reserve a Table</button>
            <h5>(781) 867-7997</h5>
            <h3>Follow us on our Social Media:</h3>
            <button>IG</button>
            <button>FB</button>
            <h3>Or submit an inquiry below:</h3>
            <input type='text' placeholder='Name'></input>
            <input type='text' placeholder='Contact Email'></input>
            <input type='text' placeholder='Message'></input>
            <button>Submit</button>
          </div>
        </Container>
      </Parallax>

      <div style={{ paddingTop: '300px' }} />

    </div>

  );
}

export default App;
