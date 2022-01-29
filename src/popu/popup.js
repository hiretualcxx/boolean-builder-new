import React, { useEffect, useState } from 'react';
import './popu.css'
import VideoPopup from "./videoPopup"
import Minpopup from "./minpopup"
const ModalExample = (props) => {
    const{modal}=props;
    const [nestedModal, setNestedModal] = useState(false);


    const [isclose,setIsclose]=useState(false)



    const toggvideo = () => {
        setNestedModal(!nestedModal);
    }
    const closemin = () => {
        setIsclose(!isclose);
    }
   
    return (
        <div className="pagezz" style={{display: modal ?  'block' :'none'} } >
            <Minpopup   modal={modal} closemin={closemin} isclose={isclose} toggvideo={toggvideo} />
            <VideoPopup toggvideo={toggvideo}  nestedModal={nestedModal} />
          
        </div>
    );
}
export default ModalExample;