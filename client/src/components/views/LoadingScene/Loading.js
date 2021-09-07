import React from 'react'
import {Style} from '../../../css/Loading.css'

function Loading() {
    return (
        <div className="Loading" style={{Style}}>
            <svg className="SvgLoading">
            <circle cx="70" cy="70" r="70"></circle>
            </svg>
        </div>
    )
}

export default Loading
