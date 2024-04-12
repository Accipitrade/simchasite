import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Story from './Story.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { ParallaxProvider } from 'react-scroll-parallax';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ParallaxProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/aboutus" element={<Story />} />
        </Routes>
      </ParallaxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
