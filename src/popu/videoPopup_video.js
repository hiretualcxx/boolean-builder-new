import React from "react";
export const VideoJS = (props) => {
  const {
    videostate,
  } = props;

  return (
      
      <div  style={ { display: videostate ?'block': 'block' } }  className="videodiv" data-vjs-player>
        
        <iframe className="videodivif" allow=" autoplay;"  src={"https://www.youtube.com/embed/7VsSMOVFqjE?enablejsapi=1&origin=https://hireez.com&autoplay=1"}>

      </iframe>
      </div>
  );
}
export default VideoJS;