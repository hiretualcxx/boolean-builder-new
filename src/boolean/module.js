
import Select, { components, DropdownIndicatorProps } from 'react-select';
var pageurl = window.location.href;

function Restbutton(params) {
    return (
        <a href="javascript:void(0)" data-vars-ga-category={params.category || ''} data-vars-ga-action="click_reset" data-vars-ga-label={pageurl} control={params.control} className="reset resetform" onClick={params.onClick}>Reset</a>
    )
}

function Waringtext(params){
    return( params.visible ? 
        <div className="waring"><img className="icon" src="https://hireez.com/wp-content/uploads/2022/01/waring.png" alt="" />  You have exceeded the maximum number of words (32)</div> : ''
    )
}

function Errtip(params) {
    return (
        <div style={{ display: params.tipdata.display }} className="errtip">{params.tipdata.tiptext}</div>
    )
}
function Recommendlab(params) {
    let arr = params.recommdata[params.type];
    const lists = arr.map(function (currentValue, index) {

        return (<li className="r_li" skilltype={params.type} val={currentValue.value} onClick={params.onClick} key={currentValue.value}>+{currentValue.value}</li>)
    })
    return (
        <ul className="systemkeyword_box">
            {lists}
        </ul>
    )
}
function Textarea(params) {
    return (
        <div className="textareodiv">
            <textarea readOnly={true} className="booleantext" id="booleanString" rows="4" value={params.val}></textarea>
            <a href="javascript:void(0)" data-vars-ga-category={params.category || ''} data-vars-ga-action="click_copy" data-vars-ga-label={pageurl} onClick={params.onClick} className="copybut">Copy</a>
        </div>

    )
}

var selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      minHeight:'62px',
      borderRadius: '8px'
    }),
    option: (base) => ({
      ...base,
      height: '62px',
      display:'flex',
      alignItems: 'center',
    }),
    multiValue: (styles, { data }) => {
        return {
          ...styles,
          backgroundColor: 'rgba(78, 141, 246, .2)',
          padding:'0 10px 0 5px',
          height: '35px',
          display:'flex',
          fontSize: '19px',
          alignItems: 'center',
          borderRadius: '3px',
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        width: '25px',
        height: '25px',
        backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACvSURBVHgBhdLBDYMwDAVQ24g9WKWT9NwjG8AEXKr20l26SvZAuPWvQHITk1jiENsPghO+P15X0m1aV72M4y1RJZblOfS9vEm6SdTQh+iXQKGF0Asjm33JFqmGPUIvDB+Fzgq2GOxJftsRQo39W3OMfISQ53xLHiMXoQLmeIcFQggFIa2GaKv+n/aGYmB/MJoe8mfT5jPkjyPCXEPRwA4sLYRALr9hdld1rqEIM+v8BbLIzwAXjGqJAAAAAElFTkSuQmCC)",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '12px auto',
        backgroundPosition: 'center 65%',
        borderRadius: '0px 5px 5px 0px',
        cursor: 'pointer',
        '>svg': {
            opacity: 0
        },
        ':hover':{
            backgroundColor:'none',
        
        }
    }),
  }
var AsyncSelectComponents = {
    
        DropdownIndicator:(props) => {
        return (
          <components.DropdownIndicator {...props}>
            <div class="triangle"></div>
          </components.DropdownIndicator>
        );
      },
      IndicatorSeparator:(innerProps) => {
        return '';
      }
    
}

function searchTip(){
    return (
        <div className='searchTip'>Type to search</div>
    )
}
function LoadingEle(){
    return (
        <div className='searchTip'>Loading...</div>
    )
}

var Selfmodule = {
    Restbutton,
    Recommendlab,
    Textarea,
    Errtip,
    Waringtext,
    selectStyle,
    searchTip,
    AsyncSelectComponents,
    LoadingEle
}
export default Selfmodule;