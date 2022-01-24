import React, { useEffect, useState } from 'react';
import './popu.css'
import VideoPopup from "./videoPopup"
import SurveyPopup from "./questionnairePopup"
import Minpopup from "./minpopup"
const ModalExample = (props) => {
    const{modal}=props;
    const [nestedModal, setNestedModal] = useState(false);
    const [surverystate, setSurveystate] = useState(false);
    let [surveyid, setSurveyid] = useState('A1');
    const [isclose,setIsclose]=useState(false)
    let [num, setnum] = useState(0);

    let allnum=4;
    const toggvideo = () => {
        setNestedModal(!nestedModal);
    }
    const closemin = () => {
        setIsclose(!isclose);
    }
    const openMaskLayer = () => {
        setSurveystate(!surverystate);
        setNestedModal(!nestedModal);
    }
    const closesurvey = () => {
        setSurveystate(!surverystate);
        setSurveyid('A1')
        setnum(0)
    }
    return (
        <div className="pagezz" style={{display: modal ?  'block' :'none'} } >
            <Minpopup   modal={modal} closemin={closemin} isclose={isclose} toggvideo={toggvideo} />
            <VideoPopup toggvideo={toggvideo} openMaskLayer={openMaskLayer} nestedModal={nestedModal} />
            <SurveyPopup surverystate={surverystate} surveyid={surveyid} setSurveyid={setSurveyid} num={num} setnum={setnum} allnum={allnum} closesurvey={closesurvey} />
        </div>
    );
}
export default ModalExample;