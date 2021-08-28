import React,{useState, useEffect} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [OpenReplayComments, setOpenReplayComments] = useState(false)
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)

    useEffect(()=>{
        let commentNumber = 0;
        props.CommentLists.map((comment)=>{
            if(comment.responseTo === props.parentCommentId){
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    },[props.CommentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) =>
         props.CommentLists.map((comment, index)=>(
            <React.Fragment>
                {comment.responseTo === parentCommentId && 
                    <div style={{ width: '80%',marginLeft:'50px'}}>
                    <SingleComment comment = {comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
                    <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction}/>
                    </div>
                    
                } 

            </React.Fragment>

        ))
    

    const handleChange = () =>{
        setOpenReplayComments(!OpenReplayComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{fontSize:'15px', margin:0, color:'gray', cursor:'pointer'}} onClick={handleChange}>View {ChildCommentNumber} more Comment(s)</p>
            }
            
            {OpenReplayComments && 
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
