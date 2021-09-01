import React,{useEffect, useState} from 'react'
import {Tooltip} from 'antd'
import axios from 'axios'
import BtnStyle from '../../../../css/LikeBtn.css'



function Like(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    let variable = {}

    if(props.board){
        variable = {boardId: props.boardId, userId:props.userId}
    }else{
        variable = {commentId: props.commentId, userId:props.userId}
    }

    const onLike = () =>{
        if(LikeAction === null){
            axios.post('/api/like/upLike', variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes + 1)
                    setLikeAction('checked')
                }else{
                    alert('추천수 업데이트에 문제가 발생했습니다')
                }
            })
        }else{
            axios.post('/api/like/unLike', variable)
            .then(response=>{
                if(response.data.success){
                    setLikeAction(null)
                    setLikes(Likes - 1)
                }else{
                    alert('추천수 업데이트에 문제가 발생했습니다')
                }
            })
        }
    }

    useEffect(()=>{
        axios.post('/api/like/getLikes', variable)
        .then(response=>{
            if(response.data.success){
                setLikes(response.data.likes.length)
                response.data.likes.map(like => {
                    
                    if(like.userId === props.userId){
                        setLikeAction('checked')
                    }
                })
            }else{
                alert('추천수를 가져오는데 문제가 발생했습니다')
            }
        })
    },[])

    return (//최적화가 필요할것 같다 (비교문이 너무 많음)
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title={(props.board)?' Recommend!':' Like!'}>
                    {LikeAction==='checked'?<input className={props.board?"RecommendBtn":"LikeBtn"}  type="checkbox" style={BtnStyle} checked="checked" onClick={onLike}/>:
                    <input className={props.board?"RecommendBtn":"LikeBtn"} type="checkbox" style={BtnStyle} onClick={onLike}/>}
                     
                </Tooltip>
                <span style={(props.board)?{position:'relative',paddingLeft:'29vw', cursor:'auto'}:{paddingLeft:'8px', cursor:'auto'}}>{Likes}{(props.board)?' Recommended':' like'}</span>
            </span>&nbsp;&nbsp;
            
        </React.Fragment>
    )
}

export default Like
