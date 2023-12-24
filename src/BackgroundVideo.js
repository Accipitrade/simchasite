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
    const framesPerSecond = 30; // Specify the frame rate of your video
    const requestRef = useRef();

    const updateVideoFrame = (scrollPosition) => {
        const video = videoRef.current;
        if (video) {
            const totalFrames = video.duration * framesPerSecond;
            const targetFrame = Math.round(totalFrames * scrollPosition);
            const targetTime = targetFrame / framesPerSecond;

            video.currentTime = Number.isFinite(targetTime) ? targetTime : video.currentTime;
        }
    };

    const handleScroll = () => {
        const newPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        updateVideoFrame(newPosition);
    };

    useEffect(() => {
        const handleAnimationFrame = () => {
            handleScroll();
            requestRef.current = requestAnimationFrame(handleAnimationFrame);
        };

        requestRef.current = requestAnimationFrame(handleAnimationFrame);

        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

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
