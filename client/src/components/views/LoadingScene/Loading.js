import React from 'react'
import {Style} from '../../../css/Loading.css'

function Loading(props) {
    return (
        <div className="Loading" style={{Style}}>
            <svg className="SvgLoading">
            <circle cx="70" cy="70" r="70"></circle>
            </svg>
            <br />
            {props.infostring && props.infostring}
        </div>
    )
}

export default Loading
