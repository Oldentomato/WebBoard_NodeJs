import React,{ useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {Card, Avatar, Col, Typography, Row} from 'antd'
import axios from 'axios'
import moment from 'moment'


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
            <div id={index} style={{position: 'relative', margin:'2px'}}>
             <Link to={{pathname:`/Boards/${file._id}`,state:{views:file.views+1, isGPS:(file.longitude===null)?false:true}}}>
            
                <img style={{width: '20vw', height:'15vw',padding:'5% 15%'}} src={`http://localhost:5000/${file.filepath}`}/>  

            <Meta 
                avatar = {
                    <Avatar src={file.writer.image} />
                }
                title={file.title}
                style={{marginLeft:'7%'}}
            />
            <div>
                <span style={{ color:'#fff'}}>{file.writer.name}</span><br />
                <span style={{ marginLeft:'4rem',color:'#fff'}}>{file.views} views </span>
                <span style={{ color:'#fff'}}>{moment(file.createdAt).format("MMM Do YY")}</span>
            </div>
            </Link>
            </div>
        </Col>
        

         )
    })

    return (
        <div className="LandingPage" style={{position: 'relative', padding: '5%', width: '85%', margin: '4rem auto'}}>
            <Link className = "writebtn" to="/Create" style={{
                    position: 'absolute',
                    right: '5vw',
                    color : '#fff',
                    backgroundColor : 'rgb(13, 149, 240)',
                    borderRadius: '10%',
                    padding: '10px',
                    zIndex: '10'

            }}>Write</Link>
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
