import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Button, Form, Input } from 'antd'
import axios from 'axios'
import Loading from '../LoadingScene/Loading'


const {TextArea} = Input;


function ModifyPage(props) {

    const [Posttitle,setPosttitle] = useState(props.location.state.title);
    const [Content,setContent] = useState(props.location.state.content);
    const [isLoading, setisLoading] = useState(false);
    const Img = props.location.state.img;
    const BoardId = props.match.params.BoardId;

    const onTitleHandler = (e) =>{
        setPosttitle(e.currentTarget.value)
    }

    const onContetHandler = (e) =>{
        setContent(e.currentTarget.value)
    }
    const CancelHandler = () => {
        props.history.push("/Boards")
    }

    const onDelete = (e) =>{
        if(window.confirm('해당 게시물을 삭제하시겠습니까?\n(댓글과 추천수도 모두 삭제가됩니다)')){
            setisLoading(true)
            e.preventDefault();
            axios.post('/api/modify/deleteContent', {BoardId: BoardId, FilePath:Img})
            .then(response=>{
                if(response.data.success){
                    axios.post('/api/comment/deleteComment',{BoardId: BoardId})
                    .then(response=>{
                        if(response.data.success){
                            axios.post('/api/like/deleteLike',{BoardId: BoardId})
                            .then(response=>{
                                if(response.data.success){
                                    setisLoading(false)
                                    alert("삭제가 완료되었습니다")
                                    window.location.replace("/Boards")
                                }else{
                                    alert("추천수 삭제에서 문제가 발생했습니다")
                                }
                            })
                        }else{
                            alert("댓글 삭제에서 문제가 발생했습니다")
                        }
                    })

                }else{
                    alert("게시물 삭제에서 문제가 발생했습니다")
                }
            })

        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            postId: BoardId,
            title: Posttitle,
            content: Content
        }

        axios.post('/api/modify/getContent',variables)
        .then(response=>{
            if(response.data.success){
                alert("게시물이 수정되었습니다")
                window.location.replace("/Boards")
            }else{
                alert("게시물 수정에 문제가 발생했습니다")
            }
        })
    }

    if(isLoading){
        return(
            <Loading/>
        )
    }else{
        return (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',
            width:'50%',height:'75vh',background:'#E6E6E6', borderRadius:'10px',margin:'10% 25%'}}>
                <Form>
                    <img style={{width: '30vw', height: '20vw'}} src={`http://3.141.196.160:5000/${Img}`}></img>
                    <br/>
                    <label>Title</label>
                    <Input 
                        onChange={onTitleHandler}
                        value={Posttitle}
                    />
                    <br/>
                    <label>Content</label>
                    <TextArea 
                        onChange={onContetHandler}
                        value = {Content}
                    />
                    <br/>
                    <br />
                    <Button style={{margin:'0 5px'}} type="primary" size="large" onClick={onSubmit}>Submit</Button>
                    <Button style={{margin:'0 5px'}} type="default" size="large" onClick={CancelHandler}>Cancel</Button>
                    <Button style={{margin:'0 5px'}} type="primary" danger="true" size="large" onClick={onDelete}>Delete</Button>
    
                </Form>
            </div>
        )
    }

}

export default withRouter(ModifyPage)
