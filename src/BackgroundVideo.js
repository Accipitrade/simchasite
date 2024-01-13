import React, { useState, useEffect, useRef } from 'react';
import desktopVideo from './simchafire.mp4';
import mobileVideo from './simchafire.mp4';
import './BackgroundVideo.css';

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

const BackgroundVideo = () => {
    const [width] = useWindowSize();
    const videoRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const framesPerSecond = 30; // Specify the frame rate of your video
    const isMobile = width <= 768; // Adjust this value based on your needs

    const updateScrollPosition = () => {
        const newPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        setScrollPosition(newPosition);
    };

    const handleTouchMove = (e) => {
        // Calculate scroll position based on touch position
        const touchPosY = e.touches[0].clientY;
        const newPosition = touchPosY / (document.body.scrollHeight - window.innerHeight);
        setScrollPosition(newPosition);
    };

    useEffect(() => {
        if (isMobile) {
            // Listen for touch move events on mobile
            window.addEventListener('touchmove', handleTouchMove, { passive: true });
        } else {
            // Listen for scroll events on desktop
            window.addEventListener('scroll', updateScrollPosition, { passive: true });
        }
        return () => {
            if (isMobile) {
                window.removeEventListener('touchmove', handleTouchMove);
            } else {
                window.removeEventListener('scroll', updateScrollPosition);
            }
        };
    }, [isMobile]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const totalFrames = video.duration * framesPerSecond;
            const targetFrame = Math.round(totalFrames * scrollPosition);
            const targetTime = targetFrame / framesPerSecond;

            video.currentTime = Number.isFinite(targetTime) ? targetTime : video.currentTime;
        }
    }, [scrollPosition]);

    return (
        <video
            ref={videoRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
                zIndex: -1
            }}
            src={width <= 768 ? mobileVideo : desktopVideo}
            muted
            loop
        />
    );
};

export default BackgroundVideo;