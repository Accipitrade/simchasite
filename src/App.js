import React, { useState, useEffect, useRef } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { Link } from 'react-router-dom'
import scrollTo from 'animated-scroll-to';
import SVGButton from './SVGButton.js';
import BackgroundVideo from './BackgroundVideo.js';
import logo from './logo.png'
import './styles.css'
import GoogleDocViewer from './GoogleDocViewer.js';
import axios from 'axios';
import Container from './Container.js';
import Gallery from './Gallery/Gallery.js';
import Popup from './Popup.js';
import IgLogo from './Instagram_logo.png';
import FbLogo from './Facebook_logo.png';


const App = () => {

  const menuRef = useRef(null);

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [popupMessage, setPopupMessage] = useState(process.env.POPUP_MESSAGE)

  const [isOpen, setIsOpen] = useState(true); //used for controlling pop up

  const [menuType, setMenuType] = useState('dinner');

  const handleMenuChange = (event) => {
    setMenuType(event.target.value);
  };

  const OpenPopUp = () => {
    setIsOpen(true)
  }

  const menus = {
    dinner: process.env.DINNER_MENU,
    brunch: process.env.BRUNCH_MENU, // Your brunch menu URL
    tt: process.env.TACO_MENU, // Taco Tuesday URL
    kid: process.env.KIDS_MENU,
  };

  const documentURL = menus[menuType] || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // Assuming your Netlify function is set up at this endpoint
        const response = await axios.post('/.netlify/functions/NodeMailer', formData);
        console.log('Server Response:', response.data);
        setPopupMessage("Message sent!");
        setIsOpen(true);
        // Reset form fields after successful form submission
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } catch (error) {
        setPopupMessage("Message failed to send. Please try again later.");
        setIsOpen(true);
        console.error('Failed to send message:', error);
      }
    }
  };

  // Validate the form data
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    if (!values.message) {
      errors.message = "Message is required";
    }
    return errors;
  };

  useEffect(() => {

    if(popupMessage == ''){
      setIsOpen(false);
    } else setIsOpen(true);

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
      scrollTo(menuRef.current, { speed: 800, verticalOffset: -350, maxDuration: 450 });
    }
  };

  return (
    <div className='page'>

      <Popup className="popup" isOpen={isOpen} setIsOpen={() => { setIsOpen(false); }}>
        <div>
          <h2>
            Simcha is now permanently closed. Thank you for the years of support!
          </h2>
        </div>
      </Popup>

      <div className='top-border'>
        <img className='logo' src={logo} />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '20px', justifyContent: 'space-between' }}>
          <h5 onClick={handleMenuClick} style={{ cursor: 'pointer' }}>Menu</h5>
          <h5><Link to='/aboutus' className='navbar-link'>About Us</Link></h5>
          <h5>
            <a className='navbar-link' href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=26f53f2a-8d84-469d-9df9-1760d0d64bd4" target='_blank'>
              Order Online
            </a>
          </h5>

          <h5>
            <a className='navbar-link' href="https://www.foodbooking.com/ordering/restaurant/menu/reservation?restaurant_uid=26f53f2a-8d84-469d-9df9-1760d0d64bd4&reservation=true" target='_blank'>
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
        <Container backgroundColor='orange' id='menu'>

          <div ref={menuRef}>
            <select value={menuType} onChange={handleMenuChange} className="menu-select" style={{ marginBottom: "50px", alignSelf: "center" }}>
              <option value="dinner">Dinner Menu</option>
              <option value="brunch">Brunch Menu</option>
              <option value="drink">Drink Menu</option>
              <option value="tt">Taco Tuesday</option>
              <option value="kid">Kid's Menu</option>
            </select>
          </div>

          <SVGButton onClick={() => openInNewTab("https://www.foodbooking.com/ordering/restaurant/menu/reservation?restaurant_uid=26f53f2a-8d84-469d-9df9-1760d0d64bd4&reservation=true")} style={{ marginBottom: "50px", alignSelf: "center" }}>Click here to order online</SVGButton>

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
          <div style={{ textAlign: 'center', justifyContent: 'center' }}>
            <h3>Hungry for more? Place a reservation or call us!</h3>
            <SVGButton onClick={() => openInNewTab('https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=26f53f2a-8d84-469d-9df9-1760d0d64bd4')} style={{ display: "flex", justifyContent: 'center', marginBottom: "50px", }}>Click here to reserve a table</SVGButton>
            <h5>(781) 867-7997</h5>
            <h3>Follow us on our Social Media:</h3>
            <img onClick={() => openInNewTab('https://www.instagram.com/simcharestaurant/')} src={IgLogo} style={{maxWidth:'80px', marginRight: "5px"}} />
            <img onClick={() => openInNewTab('https://www.facebook.com/simchaboston/')} src={FbLogo} style={{maxWidth:'80px',  marginLeft: "5px"}} />
            <h3>Or submit an inquiry below:</h3>
            <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        

        <input
          type="text"
          name="email"
          placeholder="Contact Email"
          value={formData.email}
          onChange={handleChange}
        />
        

        <input
          type="text"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />
        {formErrors.name && <p>{formErrors.name}</p>}
        {formErrors.email && <p>{formErrors.email}</p>}
        {formErrors.message && <p>{formErrors.message}</p>}

        <button type="submit">Submit</button>
      </form>
            <h5 style={{marginTop: '25px', textDecoration: 'none'}}>A website by <a href='https://www.joshslavin.com/' target='_blank'>Josh Slavin</a></h5>
          </div>
        </Container>
      </Parallax>

      <div style={{ paddingTop: '300px' }} />

    </div>

  );
}

export default App;
