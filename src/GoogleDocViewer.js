import React from 'react';
import * as style from './GoogleDocViewer.css';

const GoogleDocViewer = ({ menuType, documentURL }) => {
  const handleIFrameLoad = (e) => {
    const iframe = e.target;
    iframe.style.height = 1000 + 'px';
  };

  return (
    <div>

      <div className='iframe-container'>
        <iframe src={documentURL} style={{ border: 'none' }} onLoad={handleIFrameLoad} />
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
