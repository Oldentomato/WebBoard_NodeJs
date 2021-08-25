import React,{useEffect, useState, useCallback} from 'react'
import {List, Avatar, Typography} from 'antd'
import axios from 'axios'

const {kakao} = window;

function DetailPage(props) {

    const BoardId = props.match.params.BoardId //App.js에 있는 :fileId를 참조
    const [File, setFile] = useState([])

    const fileVariable = {
        BoardId : BoardId
    }



    const SetMap = (lat, lon) =>{
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

    const BackPage = () =>{
        props.history.push("/Boards")
    }

    useEffect(()=>{
        axios.post('/api/board/getimage',fileVariable)
        .then(response=>{
            if(response.data.success){
                setFile(response.data.board)
                SetMap(response.data.board.latitude ,response.data.board.longitude)
            }else{
                alert("게시물을 가져오는데 실패했습니다")
            }
        })

        
    },[])

    return (
        <div className="postPage" style={{position: 'absolute', width: '100%', padding: '10rem 9em', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.4)'}}>
             <button onClick={BackPage}>exit</button>
            <img style={{width: '90%'}} src={`http://localhost:5000/${File.filepath}`}></img>
            <div id="map" style={{width: "600px", height:"500px"}}></div>
            <List.Item 
                actions={[]}
            >
                <List.Item.Meta
                    avatar={<Avatar src />}
                    title={<a href="https://ant.design">{File.title}</a>}
                    description
                />
                <div></div>
            </List.Item>
           
            
        </div>

    )
}

export default DetailPage
