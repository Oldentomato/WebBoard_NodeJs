import React,{ useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {Style} from '../../../css/LandingPage.css'
import {Card, Avatar, Col, Typography, Row} from 'antd'
import axios from 'axios'
import moment from 'moment'
import ClearableLabeledInput from 'antd/lib/input/ClearableLabeledInput'

const {Title} = Typography;
const {Meta} = Card;

//여기다가 rfce만 치면 자동완성
//es7 react를 설치해야함


function LandingPage(props) {
    const [Image, setImage] = useState([]);



    useEffect(() =>{
        axios.get('/api/board/getimages')
        .then(response=>{
            if(response.data.success){
                setImage(response.data.board)
            }else{
                alert("이미지 불러오기에 실패했습니다")
            }
        })

    },[])


    const renderCards = Image.map((file, index)=>{

         return(
        <Col lg={6} md={8} xs={24}>
            <div style={{position: 'relative'}}>
             <Link to={`/Boards/${file._id}`}>
            
            
                <img style={{width: '15em', height:'10em'}} src={`http://localhost:5000/${file.filepath}`}/>  
            <br/>
            <br/>
            <Meta 
                avatar = {
                    <Avatar src={file.writer.image} />
                }
                title={file.title}
            />
            <div>
                <span style={{ color: '#fff'}}>{file.writer.name}</span><br />
                <span style={{ marginLeft:'3rem', color: '#fff'}}>{file.views} views </span>
                <span style={{color: '#fff'}}>{moment(file.createdAt).format("MMM Do YY")}</span>
            </div>
            </Link>
            </div>
        </Col>
        

         )
    })

    return (
        <div className="LandingPage" style={{position: 'relative', padding: '5%', width: '85%', margin: '4rem auto',background:'#7597'}}>
            <Link className = "writebtn" to="/Create">Write</Link>
            <Title level={2} style={{ color: '#fff'}}>Contents</Title>
            <hr />
            <br />
            <Row>
                {renderCards}
            </Row>
           
        </div>
    )
}

export default withRouter(LandingPage)
