import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value)
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();//이 함수가 있으면 페이지가 refresh를 하지 않는다
        if(Password !== ConfirmPassword){
            return alert("비밀번호가 서로 다릅니다")
        }

        let body ={
            email: Email,
            password: Password,
            name: Name
        }
        dispatch(registerUser(body))//액션을 발생시키는 함수
        .then(response =>{
            if(response.payload.success){
                alert("회원가입에 성공했습니다")
                props.history.push("/login")
            }else{
                alert("회원가입에 실패했습니다")
            }
        })


    }

    return (
        <div className="RegisterForm" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <form style={{
                display:'flex',
                flexDirection: 'column'
            }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
