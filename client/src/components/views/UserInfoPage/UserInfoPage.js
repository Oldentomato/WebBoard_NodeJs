import React,{useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {List, Avatar, Card} from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'

const {Meta} = Card;

function UserInfoPage(props) {
    const user = props.location.state.user
    const [Image, setImage] = useState([])

    useEffect(()=>{
        axios.post('api/board/getuserimages',{writer:user._id})
        .then(response=>{
            if(response.data.success){
                setImage(response.data.board)
            }else{
                alert("이미지 불러오기에 실패했습니다")
            }
        })
    },[user])

    const renderpost = Image.map((file, index) =>{
        return (
            <div style={{float:'left'}}>
                 <Link to={{pathname:`/Boards/${file._id}`,state:{views:file.views+1, isGPS:(file.longitude===null)?false:true, scroll:window.scrollY}}}>
            
            <img style={{width: '15vw', height:'10vw',padding:'5% 15%'}} src={`http://localhost:5000/${file.filepath}`}/>  

        <Meta 
            title={file.title}
            style={{marginLeft:'7%'}}
        />
        </Link>
            </div>
        )
    })

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',
        width:'60%', height:'70vh', background:'#E6E6E6' , borderRadius:'10px', margin:'10% 20%'}}>
            <div style={{position:'absolute',display:'block',height:'25vw',right:'68vw'}}>
                <List.Item.Meta
                    avatar={<Avatar src={user.image}/>}
                    title={<p style={{fontSize:'25px'}}>{user.name}</p>}
                />
                <p style={{fontSize:'20px'}}>{user.role===1 ? "관리자":"일반유저"}</p>
                <p>올린게시물</p>
            </div>
            <br/>
            
            <br/>
            <div style={{position:'relative',top:'50px',display:'flex', float:'left', width:'100%',overflow:'scroll', overflowX:'scroll', overflowY:'hidden'}}>
                
                {renderpost}
            </div>   
            
            
        </div>
    )
}

export default withRouter(UserInfoPage)
