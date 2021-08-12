import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux'


function CreatePage() {
    return (
        <div className="BoardForm">
            <input type="text"/>
        </div>
    )
}

export default withRouter(CreatePage)
