import React,{useState} from 'react'
import {Comment, Avatar, Button, Input} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'
import {useSelector} from 'react-redux'
import Like from './Like'

function SingleComment(props) {

    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState("")
    const user = useSelector(state=>state.user)

    const handleChange = (e) =>{
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () =>{
        setOpenReply(!OpenReply)
    }

    const action = [
        <Like style={{height:'1px'}} comment boardId = {props.postId} commentId={props.comment._id} userId={props.userId}/>,
        <span onClick={openReply} key = "comment-basic-reply-to">Reply to</span>
    ]

    const onSubmit = (e) =>{//답글저장부분
        if(CommentValue === ""){
            alert("댓글을 입력하십시오")
        }
        else{
            e.preventDefault()

            const variables = {
                writer: user.userData._id,
                postId: props.postId,
                responseTo: props.comment._id,
                content: CommentValue
            }
            axios.post('/api/comment/saveComment',variables)
            .then(response=>{
                if(response.data.success){
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                }else{
                    alert('댓글 저장에 실패했습니다')
                }
            })
        }

    }

    return (
        <div>
            <Comment
                actions={action}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
        {OpenReply && 
                    <form style={{display: 'flex'}} onSubmit = {onSubmit}>
                    <TextArea
                        style={{width: '100%', borderRadius:'5px'}}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some somments"
                    />
                    <br />
                    <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
                </form>
        }
        </div>
    )
}

export default SingleComment
