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
    const [user, setuser] = useState("");

    useEffect(()=>{
        dispatch(auth())
        .then(response=>{
            if(response.payload.name !== undefined){
                setIsUser(true)
                setuser(response.payload)
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
                {isUser&&<Link className="User" to={{pathname:'/User', state:{user:user}}}>
                    {Name}님 환영합니다
                </Link>}

            </header>
        </div>
    )
}

export default NavBar