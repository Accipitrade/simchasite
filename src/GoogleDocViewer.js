import React, { useState } from 'react';
import * as style from './GoogleDocViewer.css';

const GoogleDocViewer = () => {
  const [menuType, setMenuType] = useState('dinner'); // State variable to control the menu type

  const brunchMenuURL = ''; // Your brunch menu URL goes here
  const dinnerMenuURL = 'https://docs.google.com/document/d/e/2PACX-1vS7R1U6PjnfqWgrX-Q2kIAOdOcBwotfSqlXhq66sbmScpAOsojROc-hVDF_Rcblpkrparb88FWXyfpV/pub';

  // Function to change the menu based on selection
  const handleMenuChange = (event) => {
    setMenuType(event.target.value);
  };

  const handleIFrameLoad = (e) => {
    const iframe = e.target;
    // Set the height of the iframe based on its content
    // You might need to adjust the calculation based on your specific content
    iframe.style.height =  1000+'px';
  };

  // Determine which menu URL to use
  const documentURL = menuType === 'dinner' ? dinnerMenuURL : brunchMenuURL;

  return (
    <div>
      <select value={menuType} onChange={handleMenuChange} className="menu-select" style={{marginBottom:"50px", marginLeft:"25vw", alignSelf:"center"}}>
        <option value="dinner">Dinner Menu</option>
        <option value="brunch">Brunch Menu</option>
      </select>

      <button style={{marginLeft:'70px'}}>Click here to order online!</button>

      <div className='iframe-container'>
        <iframe src={documentURL} 
  style={{ border: 'none' }} 
  onLoad={handleIFrameLoad}  />
      </div>
      <div className='mobile-view'>
        <a href={documentURL}>
          Click Here to View our Menu!
        </a>
      </div>
    </div>
  );
};

export default GoogleDocViewer;
