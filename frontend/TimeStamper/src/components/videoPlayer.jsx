import React, {useRef} from "react";
import VideoJS from "./videojs";
import "../styles/video-theme.css";


//Configures the player and controls it with play/pause etc
export default function VideoPlayer({videoFile}) {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: videoFile,
      type: "video/mp4"
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Example listeners delete later if not needed? IDK
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  // Example can call methods on playerRef later USE THIS FOR SKIPPING TO TIMESTAMPS???
  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  return (
    <div className="videojs-wrapper">
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div style={{marginTop: "1rem"}}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
}