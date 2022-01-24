import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
export const VideoJS = (props) => {
  const {
    videostate,
  } = props;
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;
  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      });
    } else {
    }
  }, [options]);
  React.useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);
  return (
    <>
      <video style={{ display: videostate ? 'block' :'none'} } id="video2" className="video1" muted="muted" loop="loop" poster="https://hireez.com/wp-content/uploads/2021/11/Group-7041.png">
        Your browser does not support the video tag
      </video>
      <div style={ { display: videostate ?'none': 'block' } } data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </>
  );
}
export default VideoJS;