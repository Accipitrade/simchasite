import React from 'react';

const SVGButton = ({ children, onClick }) => {
    return (
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', width: "100%", marginBottom: "3vh", display: "flex", justifyContent: 'center' }} onClick={onClick}>

            <svg width="200" height="50" viewBox="0 0 200 50">
                <rect x="0" y="0" width="200" height="50" rx="25" fill="#603813" />
                <text x="100" y="50%" fill="white" fontSize="16" fontFamily="Arial" textAnchor="middle" alignmentBaseline="central">{children}</text>
            </svg>


        </button>
    );
};

export default SVGButton;