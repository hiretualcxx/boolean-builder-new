
import React, {  useState } from 'react';
const Minpopup = (props) => {
    const {
        closemin,
        toggvideo,
        isclose
      } = props;

    return (
        
            <div className={isclose ? "narrow-box narrow-box2":"narrow-box "} >
                <button onClick={closemin} className="box-close">&times;</button>
                <div onClick={toggvideo} className="narrow_text-img">
                    <img src="https://hireez.com/wp-content/uploads/2021/12/minimg.png" alt="" />
                    <p>
                    Outbound Recruiting Made Easy
                    </p>
                </div>
            </div>
           
    );
}
export default Minpopup;