import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {auth} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'
import {Style} from '../../../css/LandingPage.css'
//여기다가 rfce만 치면 자동완성
//es7 react를 설치해야함

function LandingPage(props) {
    const dispatch = useDispatch();

    const [Name, setName] = useState("");

    useEffect(()=>{
        dispatch(auth())
        .then(response=>{
            if(response.payload.isAdmin === true){
                setName("관리자")
            }else{
                setName(response.payload.name)
            }

        })
    })
    

    

    const onClickHandler = () =>{
        axios.get('api/users/logout')
        .then(response => {
            if(response.data.success){
                alert("로그아웃하였습니다")
                props.history.push("/")

            }else{
                alert("로그아웃에 실패했습니다")
            }
        })
    }


    return (
        <div className="LandingPage" style={Style}>
            <h2>LandingPage</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
            <br/>
            <p>
                {Name}님 환영합니다
            </p>
        </div>
    )
}

export default withRouter(LandingPage)
