import React,{useState} from 'react'
import {Button, Input} from 'antd'
import axios from 'axios'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

const {TextArea} = Input

function Comments(props) {

    const user = useSelector(state=> state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) =>{
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        if(Comment === ""){
            alert("댓글을 입력하십시오")
        }
        else{
            e.preventDefault();
            const variables = {
                content: Comment,
                writer: user.userData._id,
                postId: props.postId
            }
            axios.post('/api/comment/saveComment', variables)
            .then(response=>{
                if(response.data.success){
                    setComment("")
                    props.refreshFunction(response.data.result)
                }else{
                    alert('댓글저장에 실패했습니다')
                }
            })
        }

    }

    return (
        <div>
            <br />
            <p>Comments</p>
            <hr/>
            {/*Comment Lists*/}
            {props.CommentLists && props.CommentLists.map((comment, index)=>(
                (!comment.responseTo &&                 
                <React.Fragment>
                    <SingleComment comment = {comment} postId={props.postId} userId={user.userData._id} refreshFunction={props.refreshFunction}/>
                    <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction}/>
                </React.Fragment>)

            ))}
            {/* Root Comment Form*/}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange = {handleChange}
                    value = {Comment}
                    placeholder="write some comments"
                    required= 'required'
                />
            <br/>
            <Button style={{width: '100px', height:'52px'}} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comments
