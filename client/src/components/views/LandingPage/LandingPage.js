import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {auth} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'
//여기다가 rfce만 치면 자동완성
//es7 react를 설치해야함

function LandingPage(props) {
    const dispatch = useDispatch();

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

    const [Name, setName] = useState("")

    const onClickHandler = () =>{
        axios.get('api/users/logout')
        .then(response => {
            if(response.data.success){
                alert("로그아웃하였습니다")
                props.history.push("/login")

            }else{
                alert("로그아웃에 실패했습니다")
            }
        })
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <h2>LandingPage</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
            <br/>
            <h3>
                {Name}님 환영합니다
            </h3>
        </div>
    )
}

export default withRouter(LandingPage)
