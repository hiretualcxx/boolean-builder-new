
import React from 'react';
import { Modal } from 'reactstrap';
import Question from './question.json';
import Result from './result.json';
const SurveyExample = (props) => {
    const {
        surverystate,
        closesurvey,
        surveyid,
        setSurveyid,
        num,
        allnum,
        setnum
    } = props;
    const clickans=(index)=>{
        setSurveyid(index)
        setnum(num+1)
    }
    const obj1 = Question;
    const obj2 = Result;
    return (
        <Modal isOpen={surverystate}>
            {
                obj1.map((name) => name.id == surveyid ?
                    <div id="survy" key={name.id }>
                        <button className="close-btn" onClick={closesurvey}>
                            <img src="https://hireez.com/wp-content/uploads/2021/11/Vector-1.png"
                                alt="Cross icon in blue" />
                        </button>
                        <div>
                            <div className="title">
                                <img src="https://hireez.com/wp-content/uploads/2021/11/Group-7109.png"
                                    alt="Checklist icon" />
                                <div className="question" dangerouslySetInnerHTML={{__html: name.qu}} ></div>
                            </div><div className="answer-box">
                                {name.an.map((name2, index2) => <button onClick={()=>{clickans(name2.goid)}} className="answer" key={name2+index2}>{name2.Options}</button>)}
                            </div></div>

                        <div className="progress-bar">
                            <div className="progress" style={{width:`${num/allnum*100}`+'%'}}></div>
                        </div>
                    </div> : ''
                )
            }
            {
                obj2.map((name3) => name3.id == surveyid ? <div className="result result1" key={ name3.id} >
                    <button className="close-btn" onClick={closesurvey}>
                        <img src="https://hireez.com/wp-content/uploads/2021/11/Vector-1.png"
                            alt="Cross icon in blue" />
                    </button>
                    <div className="re-box">
                        <div className="round1">
                            <div className="roundiv"></div>
                            <div className="roundiv"></div>
                            <div className="roundiv"></div>
                            <div className="roundiv"></div>
                        </div>

                        <div className="content1">
                            <div className="h1">{name3.content1.h1} </div>
                            <div className="h3">{name3.content1.h3}<span>{name3.content1.h3span}</span></div>
                            <div id="resultBtn">
                                <a href={name3.content1.url} target="_blank" >{name3.content1.btn}</a>
                            </div>
                            
                            <img className="no-lazyload" width="289px"
                                src={name3.content1.imgurl}
                                alt="" />
                            <div className="h5">
                                {name3.content1.h5}
                            </div>
                        </div>
                    </div>
                    <div className="content2">
                        <div className="text1" dangerouslySetInnerHTML={{__html:name3.content2.text1}} >
                            
                        </div>
                        {name3.content2.buyit != undefined ? <div className="buyit">
                            <div className="explain">
                                <div><a className="a1">{name3.content2.buyit[0].explain_a}</a> {name3.content2.buyit[0].explain_text}</div>
                                <div><a className="a2">{name3.content2.buyit[1].explain_a}</a> {name3.content2.buyit[1].explain_text}</div>
                            </div>
                        </div> : ''}
                        <div className="box">
                            <div className="box-title">{name3.content2.box_title}</div>
                            <ul>
                                {name3.content2.ul.map((name4, index4) => <li key={name4+index4}>
                                    <div className="bg"></div>
                                    <span dangerouslySetInnerHTML={{__html:name4.lispan}}></span>
                                    {name4.questtext != '' ? <div className="question-icon">
                                        <div className="question-text">
                                            {name4.questtext}
                                        </div>
                                    </div> : ''}
                                </li>)}
                            </ul>
                            <div className="box-bottom">{name3.content2.box_bottom}</div>
                            <div className="lunbo-img">
                                {
                                    name3.content2.lunbo_img.length >= 2 ? name3.content2.lunbo_img.map((name5, index5) => <img src={name5} key={name5+index5}
                                        alt="Enterprise logos" className={'img' + (index5 + 1)} />
                                    ) : <img src={name3.content2.lunbo_img[0]} 
                                        alt="Enterprise logos" className="img3" />
                                }
                            </div>
                        </div>
                        <a href={name3.btn2.url} target="_blank" className="btn2" rel="noopener">{name3.btn2.text}</a>
                        <div className="help">{name3.help}</div>
                    </div>
                </div> : '')
            }
        </Modal>
    )
}
export default SurveyExample;