
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

var Selfmodule = {
    Restbutton,
    Recommendlab,
    Textarea,
    Errtip,
    Waringtext
}
export default Selfmodule;