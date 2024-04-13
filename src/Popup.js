import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center; /* Updated to center vertically */
  z-index: 10;
`;

const PopupContainer = styled(motion.div)`
  background-color: grey;
  border-radius: 10px;
  position: relative;
  max-width: 50%;
  width: auto; /* Add a specific width if necessary */
  max-height: 75%;
  height: auto; /* Add a specific height if necessary */
  padding: 20px;
  overflow-y: auto;
  
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: start;
  
  transform: translateY(-50%); /* Added for better vertical centering */

  h2, h4 {
    font-family: sans-serif;
    font-size: calc(20px + 2vmin);
  }

  p, li {
    font-family: 'Montserrat', sans-serif;
    font-size: calc(14px + 1vmin);
  }

  @media (max-width: 600px) {
    .image, .video {
      display: none;
    }
    
    h2, p, li {
      text-align: center;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Popup = ({ isOpen, setIsOpen, children }) => {
  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <PopupContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setIsOpen(false)}>X</CloseButton>
            {children}
          </PopupContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Popup;

