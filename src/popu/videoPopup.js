import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'reactstrap';
import VideoJS from './videoPopup_video';
const VideoPopup = (props) => {
  const {
    nestedModal,
    toggvideo,
    videostate,
  } = props;


  return (
    <Modal isOpen={nestedModal} className="videott">
      <div className="part6">
        <div onClick={toggvideo} className="closevideo" id="closeVideoBtn">&times;</div>
        <div className="round2">
          <div className="roundiv"></div>
          <div className="roundiv"></div>
        </div>
        <h2 className="part-title xuxu active">Outbound Recruiting Made Easy</h2>
        <div className="box xuxu active">
          {<VideoJS  videostate={videostate}  />}
        </div>
        
      </div>
    </Modal>
  )
}
export default VideoPopup;
