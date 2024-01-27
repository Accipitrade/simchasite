import React, { useState, useEffect, useRef } from 'react';
import picture from './simchafire.PNG';
import video from './simchafire.mp4';
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
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [width] = useWindowSize();
    const videoRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const framesPerSecond = 30; // Specify the frame rate of your video
    const isMobile = width <= 768; // Adjust this value based on your needs

    const onVideoLoad = () => {
        setVideoLoaded(true); // Update state when video is loaded
    };

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

        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
            {!videoLoaded && (
                <img
                    src={picture}
                    alt="background"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            )}
            <video
                ref={videoRef}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: videoLoaded ? 'block' : 'none' // Hide video until loaded
                }}
                src={video}
                muted
                loop
                onLoadedData={onVideoLoad} // Event handler for when video data is loaded
            />

            {/* <video
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
            src={video}
            muted
            loop
        /> */}
        </div>

        
        
    );
};

export default BackgroundVideo;