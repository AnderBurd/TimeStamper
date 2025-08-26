import React, {useEffect, useRef} from "react";
import videojs from "video.js";



//Creates the video-js DOM element and intiliazes player
export default function VideoJS({options, onReady}){

    //video.js instance
    const playerRef = useRef(null);
    
    const videoRef = useRef(null);

    useEffect(() => {
    if (!videoRef.current) return;

    if (!playerRef.current) {
        const videoElement = document.createElement("video-js");
        videoElement.classList.add("vjs-big-play-centered", "video-js");

        videoRef.current.appendChild(videoElement);

        // Initialize player
        const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        if (onReady) {
            onReady(player);
        }
        });
    }
    }, [options, onReady]);

    return (
    <div data-vjs-player>
        <div ref={videoRef}/>
    </div>
    );
    }