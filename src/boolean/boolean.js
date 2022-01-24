import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Demo.css';
import AsyncSelect from 'react-select/async';
import copy from 'copy-to-clipboard';
import Selfmodule from './module';
import  ModalExample from '../popu/popup';
import { Alert } from 'reactstrap';
import md5 from 'js-md5';

const {
  Recommendlab,
  Textarea,
  Restbutton,
  Waringtext,
} = Selfmodule;

var pageurl = window.location.href;

function Boolean() {
  const public_data = useRef({
    skillstype: 'job',
    lablearr: {
      job: [],
      skill_and: [],
      skill_or: [],
      skill_not:[],
      location: [],
    },
    valuearr: {
      job: [],
      skill_and: [],
      skill_or: [],
      skill_not:[],
      location: [],
    },
  });
  const [recommdata, setrecommdata] = useState({
      job: [],
      skill_and: [],
      skill_or: [],
      skill_not:[],
      location: [],
  });
  const [skillnotrecommdata, setskillnotrecommdata] = useState({skill_not:[]});
  const [jobval, setjobval] = useState([]);
  const [skill_andval, setskill_andval] = useState([]);
  const [skill_orval, setskill_orval] = useState([]);
  const [skill_notval, setskill_notval] = useState([]);
  const [locationval, setlocationval] = useState([]);
  const [booleanstr, setbooleanstr] = useState(null);
  const [waring, setwaring] = useState('');
  const [butstate, setbutstate] = useState('disable');
  const [modal, setModal] = useState(false);
  const [errtip, seterrtip] = useState({text: <div>Something wrong happened,<br/> please try again.</div>,visible:false});

  public_data.current.setjobval = setjobval;
  public_data.current.setskill_andval = setskill_andval;
  public_data.current.setskill_orval = setskill_orval;
  public_data.current.setskill_notval = setskill_notval;
  public_data.current.setlocationval = setlocationval;

  const rest = (e) => {
    let control = e.target.getAttribute('control');
   
      public_data.current.lablearr = {
        job: [],
      skill_and: [],
      skill_or: [],
      skill_not:[],
      location: [],
      }
      setrecommdata({
        job: [],
        skill_and: [],
        skill_or: [],
        skill_not:[],
        location: [],
      });
      setskillnotrecommdata({skill_not:[]});
      setjobval([]);
      setskill_andval([]);
      setskill_orval([]);
      setskill_notval([]);
      setlocationval([]);
      setbooleanstr(null);
      setwaring('')
      setbutstate('disable');
    if(control == 'toTop'){
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  const loadOptions = (d, callback) => {
    
    public_data.current.reqT && clearTimeout(public_data.current.reqT);
    public_data.current.reqT = setTimeout(() => {
      ajax_fn('', callback, 'predictkw');
    }, 300)
  }
  const ajax_fn = (d, callback, type,skillstype) => {
    // test
    let api_key = '2f1d4a75319950bcccf921e46e8fd71bb1d9459b';
    let api_secret = 'b4e868af88324510c722714d5f216bb531b70411';
    let basehost = '';
    basehost = 'https://api.testhtm.com'
    // stage
    //    let api_key = '2f8b68615115cc3ebdb59464623533c5';
    // let api_secret = 'cf425f2343f98a7369f97804488e8ffd';
    // let basehost = 'https://stageapi.testhtm.com';
  
    if(window.location.host == 'hireez.com'){
      api_key = '58394f1d06702804b69203c46ca1e8b1';
      api_secret = 'b979c3878f9bbefad7612dde699dca20';
      basehost = 'https://api.hireez.com';
    }
 
    const timestamp = new Date().toISOString();

    const signature = md5(`${api_secret}+api_key=${api_key}&timestamp=${timestamp}+${api_secret}`);

    let url =  `/website/autocompletes/${type}`;

    axios({
      method: 'post',
      url: `${basehost}${url}`,
      data: create_postdata(type,skillstype),
      headers: {
        "api-key":api_key,
        timestamp,
        signature
      }

    })
      .then(function (e) {
        if(Object.keys(e.data || {}).length == 0){
          apierr();
          return;
        }
        let data = analyseData(e.data, type,skillstype);
        callback(data);
      })
      .catch(function (error) {
        error.response && apierr(error.response.status);
       
      });
  }
  const create_postdata = (reqtype, skill_type) => {
    let postdata;
    switch (reqtype) {
      case 'predictkw':
        let dtype;
        if (public_data.current.skillstype == 'job') {
          dtype = 'title'
        } else if (public_data.current.skillstype == 'skill_and' || public_data.current.skillstype == 'skill_or' || public_data.current.skillstype == 'skill_not') {
          dtype = 'handson'
        } else if (public_data.current.skillstype == 'location') {
          dtype = 'location'
        }

        postdata = {
          flag: "typeahead",
          q: public_data.current.inputval,
          type: dtype
        }

        break;
      case 'predictTitleSkill':
     

        if(skill_type != 'skill_not'){
          postdata = {
            checkExpertise: true,
            mandatorySkills: public_data.current.lablearr.skill_and,
            relatedSkills: public_data.current.lablearr.skill_or,
            titles: public_data.current.lablearr.job,
          }
         
        }else{
          postdata = {
            checkExpertise: true,
            mandatorySkills: public_data.current.lablearr.skill_not,
            relatedSkills: public_data.current.lablearr.skill_or,
            titles: public_data.current.lablearr.job,
          }
        }
      
        break;
      default: postdata = {};
    }
    return postdata;
  }
  const analyseData = (data, type,skill_type) => {
    
    switch (type) {
      case 'predictkw':
        let m_d = data.data || [];
        let val_d = m_d.map((item) => {
          return {
            value: item,
            label: item,
            name: public_data.current.skillstype
          }
        })
        return val_d;
        break;
      case 'predictTitleSkill':
        
        data = data.data || {};
        if (Object.keys(data).length == 0 || Object.prototype.toString.call(data) != '[object Object]'){
          data={
            mandatorySkills:[],
            relatedSkills:[],
            titles:[]
          }
        };

        let skill = {};
        let str = '';
        const alllables = public_data.current.lablearr.job.concat(public_data.current.lablearr.skill_and, public_data.current.lablearr.skill_or,public_data.current.lablearr.skill_not);
       
        if (skill_type == 'skill_not') {
          skill.skill_not = [];
            
          let skillnot_d = (public_data.current.lablearr.skill_not.length||public_data.current.lablearr.job.length) ? data.mandatorySkills : [];
          
          for (let n = 0; n < skillnot_d.length; n++) {

            if (alllables.indexOf(skillnot_d[n]) < 0) {
              skill.skill_not.push({
                value: skillnot_d[n],
                label: skillnot_d[n],
                name: 'skill_not'
              })
            }

          }
        }else{
          for (let key in data) {
            if (key == 'mandatorySkills') {
              str = 'skill_and';
            } else if (key == 'relatedSkills') {
              str = 'skill_or';
            } else if (key == 'titles') {
              str = 'job';
            }
            let _d = data[key];
  
            skill[str] = [];
            if (public_data.current.lablearr.job.length == 0) {
              if (public_data.current.lablearr[str].length == 0) {
                _d = [];
              }
  
            }
            for (let i = 0; i < _d.length; i++) {
  
              if (alllables.indexOf(_d[i]) < 0) {
                skill[str].push({
                  value: _d[i],
                  label: _d[i],
                  name: skill_type
                })
              }
  
            }
          }
  
          if (!skill.mandatory) skill.mandatory = [];
          if (!skill.preferred) skill.preferred = [];
          if (!skill.job) skill.job = [];
        }
       
        return skill;
        break;
      case 'lableToval':

        for (let key in data) {
          let _d = data[key];
          public_data.current.valuearr[key] = _d.map((item) => {
            return {
              value: item,
              label: item,
              name: public_data.current.skillstype
            }
          })

        }
        return public_data.current.valuearr;
        break;
      case 'valTolable':
        const arr = data.map((item) => {
          return item.value;
        })

        public_data.current.lablearr[public_data.current.skillstype] = arr;
        return public_data.current.lablearr;
        break;
      default:
        return data;
    }
  }
  const inputchange = (e) => {
    public_data.current.inputval = e;
  }
  const handleChange = (e, d) => {
   
    let ele_d = d.removedValue || d.option || (d.removedValues && d.removedValues[0]) || { name: public_data.current.skillstype };
    public_data.current.skillstype = ele_d.name;

    // Synchronize the value and lable arrays
    analyseData(e, 'valTolable');

    public_data.current.valuearr[public_data.current.skillstype] = e;

    public_data.current['set' + public_data.current.skillstype + 'val'](e);

    splice_booleanstr();
    if (public_data.current.skillstype == 'location') {
      return;
    } else {
     
      skillnot_handleChange();
      ajax_fn('', setrecommdata, 'predictTitleSkill');
     
    }
  }
  const skillnot_handleChange = () =>{
    
    ajax_fn('', setskillnotrecommdata, 'predictTitleSkill','skill_not');
  }
  const choosesystemkeyword = (e) => {
    public_data.current.skillstype = e.target.getAttribute('skilltype');
    let val = e.target.getAttribute('val');

    const alllables = public_data.current.lablearr.job.concat(public_data.current.lablearr.skill_and, public_data.current.lablearr.skill_or,public_data.current.lablearr.skill_not);
    if (alllables.indexOf(val) > -1) return;

      public_data.current.lablearr[public_data.current.skillstype].push(val);

      let value = analyseData(public_data.current.lablearr, 'lableToval')[public_data.current.skillstype];

      public_data.current['set' + public_data.current.skillstype + 'val'](value);
      splice_booleanstr();
      skillnot_handleChange();
      ajax_fn('', setrecommdata, 'predictTitleSkill');
  }
  const inputfocus = (e) => {
    public_data.current.skillstype = e.target.id;
   

  }
  const copytext = (pop) => {
    copy(public_data.current.booleanstr);
    if(pop != 'notpop') setModal(true);
  }
  const splice_booleanstr = () => {
   
    let {
      job: jobarr=[],
      skill_and: skill_andarr=[],
      skill_or: skill_orarr=[],
      skill_not: skill_notarr=[],
      location: locationarr=[]
    } = public_data.current.lablearr;
    let [jobstr, skill_andstr, skill_orstr, skill_notstr, locationstr] = ['', '', '', '', ''];

    let allval_word = jobarr.concat(skill_andarr,skill_orarr,skill_notarr,locationarr).join(' ').replace(/\s+/g,' ').split(' ');
    if (jobarr.length > 0) {
      jobstr = `(${jobarr.map(item =>{
        if(item.split(' ').length>1){
          item =  `"${item}"`;
        }
        return item;
        }).join(' OR ')}) `
    };
    if (skill_andarr.length > 0) {
      skill_andstr = `${skill_andarr.map(item => {
        if(item.split(' ').length>1){
          item =  `"${item}"`;
        }
        return item;
        }).join(' ')} `
    };
    if (skill_orarr.length > 0) {
      skill_orstr = `(${skill_orarr.map(item => {
        if(item.split(' ').length>1){
          item =  `"${item}"`;
        }
        return item;
        }).join(' OR ')}) `
    };
    if (skill_notarr.length > 0) {
      skill_notstr = `${skill_notarr.map(item => {
        if(item.split(' ').length>1){
          item =  `"${item}"`;
        }
        return `-${item}`;
        }).join(' ')}`
    };
    if (locationarr.length > 0) {
      locationstr = `(${locationarr.map(item => {
        if(item.split(' ').length>1){
          item =  `"${item}"`;
        }
        return item;
        }).join(' OR ')}) `
    };

    let booleanstr = `${jobstr}${skill_andstr}${skill_orstr}${locationstr}${skill_notstr}`
    if(allval_word.length >= 1 && allval_word[0]){
      setbutstate('');
    }else{
      setbutstate('disable');
    };

    if (allval_word.length > 32) {
      setwaring(public_data.current.skillstype)
    } else {
      setwaring('');
    };

    return {
      strlength: allval_word.length,
      str: booleanstr
    }

  }
  const generateboolean = (e) => {
    
    public_data.current.booleanstr = splice_booleanstr().str;
    setbooleanstr(public_data.current.booleanstr);
    copytext('notpop');
    window.scrollTo({
      left: 0,
      top: e.target.offsetTop,
      behavior: 'smooth'
    });
   
    
  }
 
  const apierr = (status) => {
    let tipstr = <div>Something wrong happened,<br/> please try again.</div>;
    if(status == '429'){
      tipstr = <div> <strong>Opps!</strong><br /> You’ve exceeded your daily limit to generate boolean.</div>
    }

    if(!errtip.visible){
      seterrtip({text:tipstr,visible:true});
    public_data.current.errT = setTimeout(() => {
      seterrtip({text:'',visible:false});
      clearTimeout(public_data.current.errT)
    }, 5000);
    }
    
  }
  const closeerrytip = () => {
    seterrtip({text:'',visible:false});
    public_data.current.errT && clearTimeout(public_data.current.errT);
  }
  return (
    <div>
      <div className="boolean_part">
        <div className="main">
          <div className="toptitle">
            <img src="https://hireez.com/wp-content/uploads/2021/12/Active.png" alt="Boolean icon"
              className="icon" />
            <h1 className="ph1">
              hireEZ Boolean Builder
            </h1>
            <span className="strlen"></span>
          </div>
          <div className="formbox">
            {/* job form */}
            <div className="job_box outbox">
              
              <p className="title_p1">Job Titles</p>
              <div className="titlebox">
                <p className="title_p2"> OR <span className="grayT">(At least include one of them)</span> </p>
                <Restbutton category="HireEZ Boolean Builder" control="skill" onClick={rest} />
                <Waringtext visible={(waring == 'job')} />
              </div>
              <AsyncSelect
                className="inputbox"
                inputId='job'
                arialabel='Job Titles'
                value={jobval}
                onChange={handleChange}
                onFocus={inputfocus}
                onInputChange={inputchange}
                hideSelectedOptions={true}
                isMulti={true}
                cacheOptions
                placeholder='e.g. developer, software engineer, programmer'
                noOptionsMessage={() => "Type to search"}
                loadingMessage={() => <div className="loadingtext">Loading...</div>}
                loadOptions={loadOptions}
              />
              {
                (recommdata.job.length > 0) && <div className="data_box">
                  <Recommendlab onClick={choosesystemkeyword} recommdata={recommdata} type="job" />
                </div>
              }
            </div>

            {/* skill and form */}
            <div className="mandatory_box outbox">
            <p className="title_p1">Skills</p>
           
            <div className="titlebox">
              <p className="title_p2">AND <span className="grayT">(Include all of them)</span> </p>
                <Waringtext visible={(waring == 'skill_and')} />
            </div>
              <AsyncSelect
                className="inputbox"
                inputId='skill_and'
                arialabel='skill_and'
                value={skill_andval}
                onChange={handleChange}
                onFocus={inputfocus}
                onInputChange={inputchange}
                hideSelectedOptions={true}
                isMulti={true}
                cacheOptions
                placeholder='Enter AND keywords'
                loadingMessage={() => <div className="loadingtext">Loading...</div>}
                noOptionsMessage={() => 'Type to search'}
                loadOptions={loadOptions}
              />
              {
                (recommdata.skill_and.length > 0) && <div className="data_box">
                  <Recommendlab onClick={choosesystemkeyword} recommdata={recommdata} type="skill_and" />
                </div>
              }
            </div>

            {/* skill or form */}
            <div className="preferred_box outbox">
           
            <div className="titlebox">
            <p className="title_p2">OR <span className="grayT">(At least include one of them)</span> </p>
                <Waringtext visible={(waring == 'skill_or')} />
            </div>
              <AsyncSelect
                className="inputbox"
                inputId='skill_or'
                arialabel='skill_or '
                value={skill_orval}
                onChange={handleChange}
                onFocus={inputfocus}
                onInputChange={inputchange}
                hideSelectedOptions={true}
                isMulti={true}
                cacheOptions
                placeholder='Enter OR keywords'
                loadingMessage={() => <div className="loadingtext">Loading...</div>}
                noOptionsMessage={() => 'Type to search'}
                loadOptions={loadOptions}
              />
              {
                (recommdata.skill_or.length > 0) && <div className="data_box">
                  <Recommendlab onClick={choosesystemkeyword} recommdata={recommdata} type="skill_or" />
                </div>
              }
            </div>

              {/* skill not form */}
              <div className="preferred_box outbox">
           
            <div className="titlebox">
             <p className="title_p2">NOT <span className="grayT">(Exclude)</span> </p>
                <Waringtext visible={(waring == 'skill_not')} />
            </div>
              <AsyncSelect
                className="inputbox"
                inputId='skill_not'
                arialabel='skill_not '
                value={skill_notval}
                onChange={handleChange}
                onFocus={inputfocus}
                onInputChange={inputchange}
                hideSelectedOptions={true}
                isMulti={true}
                cacheOptions
                placeholder='Enter NOT keywords'
                loadingMessage={() => <div className="loadingtext">Loading...</div>}
                noOptionsMessage={() => 'Type to search'}
                loadOptions={loadOptions}
              />
              {
                (skillnotrecommdata.skill_not.length > 0) && <div className="data_box">
                  <Recommendlab onClick={choosesystemkeyword} recommdata={skillnotrecommdata} type="skill_not" />
                </div>
              }
              </div>

            {/* location form */}
            <div className="location_box outbox">
            <p className="title_p1">Locations</p>
           
            <div className="titlebox">
            <p className="title_p2">OR <span className="grayT">(At least include one of them)</span> </p>
                <Waringtext visible={(waring == 'location')} />
            </div>
              <AsyncSelect
                className="inputbox"
                inputId='location'
                arialabel='Location'
                value={locationval}
                onChange={handleChange}
                onFocus={inputfocus}
                onInputChange={inputchange}
                hideSelectedOptions={true}
                isMulti={true}
                cacheOptions
                placeholder='Enter city, state or country'
                loadingMessage={() => <div className="loadingtext">Loading...</div>}
                noOptionsMessage={() => 'Type to search'}
                loadOptions={loadOptions}
              />

            </div>
            <a href="javascript:void(0)" data-vars-ga-category="HireEZ Boolean Builder" data-vars-ga-action="click_generate boolean" data-vars-ga-label={pageurl} onClick={generateboolean} className={`but ${butstate}`}>
                Generate Boolean
            </a>
     
            {
              booleanstr &&
              <div className="showboolean_box">
                <div className="titlebox">
                <p className="title_p1 w_nomore"> Boolean </p>
                <Restbutton category="Boolean" control="toTop" onClick={rest} />
              </div>
                <Textarea onClick={copytext} val={booleanstr} category="Boolean" />
              </div>
            }
          </div>
        </div>
 
        <Alert className="apierrtip" color="danger" isOpen={errtip.visible} toggle={closeerrytip} fade={true}>
          <span className="icon"></span>  {errtip.text}
        </Alert>
        < ModalExample modal={modal} />
      </div>
    </div>
  )
}
export default Boolean;