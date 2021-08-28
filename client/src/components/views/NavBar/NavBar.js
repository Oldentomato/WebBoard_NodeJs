import React,{ useEffect, useState}  from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'
import {Style} from '../../../css/NavBar.css'
import axios from 'axios'

function NavBar() {
    const dispatch = useDispatch();

    const [Name, setName] = useState("");
    const [isUser, setIsUser] = useState("");
    useEffect(()=>{
        dispatch(auth())
        .then(response=>{
            if(response.payload.name !== undefined){
                setIsUser(true)
                if(response.payload.isAdmin === true){
                    setName("관리자")
                }else{
                    setName(response.payload.name)
                }
            }
            else{
                setIsUser(false)
            }
        })
    })

    const onClickHandler = () =>{
        axios.get('api/users/logout')
        .then(response => {
            if(response.data.success){
                //props.history.push("/")
                window.location.replace("/")

            }else{
                alert("로그아웃에 실패했습니다")
            }
        })
    }



    return (
        <div className="NavBar" style={Style}>
            <header>
                <Link to="/" className="logo">POLAROID</Link>
                <ul>
                    <li><a href="#" >Home</a></li>
                    <li><Link to="/Boards">Board</Link></li>
                    <li><Link to="/Register">Register</Link></li>
                    <li>{isUser ? <button onClick={onClickHandler}>LogOut</button>:
                    <Link to="/Login" className="active">Login</Link>}</li>

                </ul>
                <br/>
                <p className={isUser ? "UserIn" : "UserOut"}>
                    {Name}님 환영합니다
                </p>
            </header>
        </div>
    )
}

export default NavBar