import React from 'react';
import * as style from './GoogleDocViewer.css'

const GoogleDocViewer = () => {
  const documentURL = 'https://docs.google.com/document/d/e/2PACX-1vS7R1U6PjnfqWgrX-Q2kIAOdOcBwotfSqlXhq66sbmScpAOsojROc-hVDF_Rcblpkrparb88FWXyfpV/pub';
  return (
    <div>
    <div className='iframe-container'>
      <iframe src={documentURL} style={{border: 'none'}} />
    </div>
    <div className='mobile-view'>
        <div>
            Click Here to View our Menu!
        </div>
        <div style={{padding:'20px'}}>
            -Or-
        </div>
        <div>
            Download our Menu Here!
        </div>
    </div>
    </div>
  );
};
export default GoogleDocViewer;