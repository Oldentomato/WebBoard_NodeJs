import React from 'react'

function Loading() {
    return (
        <div style={{position:'absolute', background:'rgba(0,0,0,0.5)', color:'#fff'}}>
            <circle cx="70" cy="70" r="70"></circle>
            Loading
        </div>
    )
}

export default Loading
