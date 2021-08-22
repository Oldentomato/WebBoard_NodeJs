import React,{ useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {Style} from '../../../css/LandingPage.css'
import {Card, Avatar, Col, Typography, Row} from 'antd'
import axios from 'axios'
import moment from 'moment'

const {Title} = Typography;
const {Meta} = Card;
const {kakao} = window;
//여기다가 rfce만 치면 자동완성
//es7 react를 설치해야함


function LandingPage(props) {
    const [Image, setImage] = useState([]);
    const [lat, setlat] = useState("");
    const [lon, setlon] = useState("");

    const SetMap = () =>{
        var container = document.getElementById("map");
        var options = {
            
            center: new kakao.maps.LatLng(lat, lon),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(lat, lon); 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

    }

    const ContentBtn = () =>{
        console.log("a")
    }


    useEffect(() =>{
        axios.get('/api/board/getimage')
        .then(response=>{
            if(response.data.success){
                setImage(response.data.board)
                setlat(response.data.board[0].latitude)
                setlon(response.data.board[0].longitude)

            }else{
                alert("이미지 불러오기에 실패했습니다")
            }
        })

        //return () => SetMap();


    })


    const renderCards = Image.map((file, index)=>{

        return <button style={{background : 'None', border: 'None'}}onClick={ContentBtn}>
        <Col lg={6} md={8} xs={24}>
            <div style={{position: 'relative' , padding: '15px'}}>
                <img style={{width: '400px', height: '320px'}} src={`http://localhost:5000/${file.filepath}`}/>  
            {/* <div id="map" style={{width: "300px", height:"200px"}}></div> */}
            </div>
            <Meta 
                avatar = {
                    <Avatar src={file.writer.image} />
                }
                title={file.title}
            />
            <span style={{ color: '#fff'}}>{file.writer.name}</span><br />
            <span style={{ marginLeft:'3rem', color: '#fff'}}>{file.views} views </span>
            <span style={{color: '#fff'}}>{moment(file.createAt).format("MMM Do YY")}</span>
        </Col>
        </button>


    })

    return (
        <div className="LandingPage" style={Style}>
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
