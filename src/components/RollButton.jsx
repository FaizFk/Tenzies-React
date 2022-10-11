import React from "react";

function RollButton(props){
    return <div onClick={props.handleClick} className="roll--button">
        <p>{props.value}</p>
    </div>
}

export default RollButton