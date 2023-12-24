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

    let frameId = null;
    const framesPerSecond = 30;  // Specify the frame rate of your video
    const smoothness = 5;  // Adjusted smoothness factor

    const handleScroll = () => {
        const video = videoRef.current;
        if (video) {
            const totalFrames = video.duration * framesPerSecond;
            const fraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const targetFrame = Math.round(totalFrames * fraction);
            const targetTime = targetFrame / framesPerSecond;

            video.currentTime = Number.isFinite(targetTime) ? targetTime : video.currentTime;
        }
    };

    const smoothVideoPlayback = () => {
        const video = videoRef.current;
        if (video) {
            const totalFrames = video.duration * framesPerSecond;
            const fraction = video.currentTime / video.duration;
            const currentFrame = Math.round(totalFrames * fraction);
            const targetFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const targetFrame = Math.round(totalFrames * targetFraction);
            const frameDifference = targetFrame - currentFrame;

            if (Math.abs(frameDifference) > 1) {
                const timeStep = smoothness * frameDifference / framesPerSecond;
                video.currentTime += timeStep;
            }

            frameId = requestAnimationFrame(smoothVideoPlayback);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        window.addEventListener('scroll', handleScroll);
        frameId = requestAnimationFrame(smoothVideoPlayback);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(frameId);
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
}

export default BackgroundVideo;