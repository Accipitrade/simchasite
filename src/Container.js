import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

const Container = ({ backgroundColor, children }) => {
  const backgroundStyles = {
    glass: {
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(3.5px)',
        WebkitBackdropFilter: 'blur(3.5px)' // Note: This is for Safari compatibility
      },
    orange: { backgroundColor: 'orange' },
    translucentBlack: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    translucentWhite: { backgroundColor: 'rgba(255, 255, 255, 0.5)' }
  };

  return (
    <div className="container" style={backgroundStyles[backgroundColor]}>
      {children}
    </div>
  );
};

Container.propTypes = {
  backgroundColor: PropTypes.oneOf(['glass', 'orange', 'translucentBlack', 'translucentWhite']).isRequired,
  children: PropTypes.node.isRequired
};

export default Container;
