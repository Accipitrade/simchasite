import React, { useState, useEffect, useRef } from 'react';
import picture from './simchafire.jpg';
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
    const [imageVisible, setImageVisible] = useState(true); // New state to control image visibility
    const [width] = useWindowSize();
    const videoRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const framesPerSecond = 30;
    const isMobile = width <= 768;

    const onVideoLoad = () => {
        setVideoLoaded(true);
        // Hide image after video loads and intro animation ends
        setTimeout(() => setImageVisible(false), 2000); // Assuming 2s is the animation duration
    };

    const updateScrollPosition = () => {
        const newPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        setScrollPosition(newPosition);
    };

    const handleTouchMove = (e) => {
        const touchPosY = e.touches[0].clientY;
        const newPosition = touchPosY / (document.body.scrollHeight - window.innerHeight);
        setScrollPosition(newPosition);
    };

    useEffect(() => {
        if (isMobile) {
            window.addEventListener('touchmove', handleTouchMove, { passive: true });
        } else {
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
            {imageVisible && (
                <img
                    src={picture}
                    alt="background"
                    className="intro-animation" // Apply CSS animation
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
                    display: videoLoaded && !imageVisible ? 'block' : 'none'
                }}
                src={video}
                muted
                loop
                onLoadedData={onVideoLoad}
            />
        </div>
    );
};

export default BackgroundVideo;
