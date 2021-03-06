import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom'
import {Style} from '../../../css/LoginPage.css'

function LoginPage(props) {
    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")


    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();//이 함수가 있으면 페이지가 refresh를 하지 않는다
        let body ={
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))//액션을 발생시키는 함수
        .then(response =>{
            if(response.payload.loginSuccess){
                window.location.replace("/Boards")
            }else{
                alert(response.payload.message)

                //response.payload 는 서버의 index에서 로그인 시도
                //한 뒤의 결과 json파일을 가져온다(loginSuccess,message)

            }
        })


    }

    return (
        <div className="LoginForm" style={Style}>
            <form style={{
                display:'flex',
                flexDirection: 'column'
            }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} placeholder="EMAIL" onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} placeholder="PASSWORD" onChange={onPasswordHandler} />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
