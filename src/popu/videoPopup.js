import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';

import VideoJS from './videoPopup_video';
const VideoPopup = (props) => {
  const {
    nestedModal,
    toggvideo,
  } = props;
  const [playstate, setPlaystate] = useState(false);
  const [videostate, setVideostate] = useState(true);
  const playerRef = React.useRef(null);
  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://hireEZ.com/wp-content/uploads/2021/12/new_video.mp4',
      type: 'video/mp4'
    }]
  }
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });
    player.on('dispose', () => {
      setPlaystate(true)
    });
    player.on('pause', () => {
      setPlaystate(true)
    });
    player.on('play', () => {
      setPlaystate(false)
    })
    player.on('requestPictureInPicture',()=>{
      console.log(this)
    })
  };

  const blackPlay = () => {
    playerRef.current.play()
    setPlaystate(false)
  }
  const startPlay = () => {
    playerRef.current.play()
    setVideostate(false)
  }
  
  return (
    <Modal isOpen={nestedModal} className="videott">

      <div className="part6">

        <Button onClick={toggvideo} className="closevideo">&times;</Button>
        <div className="round2">
          <div className="roundiv"></div>
          <div className="roundiv"></div>
        </div>
        <h2 className="part-title xuxu active">How Does hireEZ Work?</h2>
        <div className="box xuxu active">
          {<VideoJS options={videoJsOptions} videostate={videostate} onReady={handlePlayerReady} />}
          <button onClick={startPlay} style={ { display: videostate ?'block': 'none' } } className="control1">
            <img alt="Play video icon"   src="https://hireez.com/wp-content/uploads/2021/11/videoplay.png" />
          </button>
          <button style={ { display:playstate ?videostate? "none": "block":"none" } } className="black-player" onClick={blackPlay} >
            <img alt="Play logo in black"  src="https://hireez.com/wp-content/uploads/2021/11/black-player.svg" />
          </button>
          <div style={{display:videostate ?'block': 'none'}}>
            <div className="advantage advantage1">
              <img alt="Portrait of a happy man"  src="https://hireez.com/wp-content/uploads/2021/11/peo1.png" />
              <div className="text">Experience the #1 Sourcing Solution </div>
              <div className="text2">Experience the #1
                Sourcing Solution</div>
            </div>
            <div className="advantage advantage2">
              <img alt="Portrait of a man"   src="https://hireez.com/wp-content/uploads/2021/11/peo2.png" />
              <div className="text">Robust candidate engagement campaigns</div>
              <div className="text2">Why we can <br />  be trusted</div>
            </div>
            <div className="advantage advantage3">
              <img alt="Portrait of a woman"  src="https://hireez.com/wp-content/uploads/2021/11/peo3.png" />
              <div className="text">Succeed with Diversity
                Sourcing &amp; Analytics</div>
              <div className="text2">We are professional
                on Diversity</div>
            </div>
            <div className="advantage advantage4">
              <img alt="Portrait of a girl"  className=" ls-is-cached " src="https://hireez.com/wp-content/uploads/2021/11/newHealthcare-2X.png" />
              <div className="text">Powerful<br /> integrations with your favorite tools</div>
              <div className="text2">hireEZ is the top AI sourcing vendor in the world</div>
            </div>
          </div>
          
        </div>
        
      </div>
    </Modal>
  )
}
export default VideoPopup;
