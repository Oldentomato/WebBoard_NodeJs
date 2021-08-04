import React,{ useEffect} from 'react'
import axios from 'axios'
//여기다가 rfce만 치면 자동완성
//es7 react를 설치해야함

function LandingPage() {

    useEffect(()=>{
        axios.get('/api/hello')
        .then(response=>console.log(response.data))
    },[])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
