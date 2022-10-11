import React from "react"

function Die(props){
    const style={
        backgroundColor: props.isHeld?"#59E391":"white"
    }
    return <div className="die" style={style} onClick={props.handleClick}>
        <p>{props.value}</p>
    </div>
}

export default Die