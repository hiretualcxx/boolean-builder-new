import React, { useEffect, useState } from 'react';
import VideoPopup from "./videoPopup"
import Minpopup from "./minpopup"
const ModalExample = (props) => {
    const{modal}=props;
    const [nestedModal, setNestedModal] = useState(false);
    const [videostate, setVideostate] = useState(true);

    const [isclose,setIsclose]=useState(false)

    const startPlay = () => {

        setVideostate(false)
      }

    const toggvideo = () => {
        setNestedModal(!nestedModal);
        if(nestedModal){//close
            document.getElementById("hiretual-nav").style.display = 'block'
        }
    }
    const closemin = () => {
        setIsclose(!isclose);
    }
   
    return (
        <div className="pagezz" style={{display: modal ?  'block' :'none'} } >
            <Minpopup   modal={true} closemin={closemin} isclose={isclose} toggvideo={toggvideo} />
            <VideoPopup toggvideo={toggvideo} startPlay={startPlay} videostate={videostate} nestedModal={nestedModal} />
          
        </div>
    );
}
export default ModalExample;