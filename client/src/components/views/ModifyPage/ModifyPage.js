import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import { Typography, Button, Form, Input } from 'antd'
import axios from 'axios'

const {Title} = Typography;
const {TextArea} = Input;

//주소 url을 통해 본인이 아닌 게시물에 modify를 접근할수있다 여기서 한번 더 체크하는 부분을 만들어야한다
function ModifyPage(props) {

    const [Posttitle,setPosttitle] = useState(props.location.state.title);
    const [Content,setContent] = useState(props.location.state.content);
    const Img = props.location.state.img;
    const BoardId = props.match.params.BoardId;

    const onTitleHandler = (e) =>{
        setPosttitle(e.currentTarget.value)
    }

    const onContetHandler = (e) =>{
        setContent(e.currentTarget.value)
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

    return (
        <div style={{display:'flex', justifyContent:'center',alignItems:'center',
        width:'50%',height:'60vh',background:'#E6E6E6', borderRadius:'10px',margin:'10% 25%'}}>
            <Form>
                <img style={{width: '40vw', height: '30vw'}} src={`http://localhost:5000/${Img}`}></img>
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
                <Button type="primary" size="large" onClick={onSubmit}>Submit</Button>

            </Form>
        </div>
    )
}

export default withRouter(ModifyPage)
