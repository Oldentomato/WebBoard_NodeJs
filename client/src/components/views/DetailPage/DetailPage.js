import React,{useEffect, useState, useCallback} from 'react'
import {List, Avatar, Typography} from 'antd'
import axios from 'axios'
import Comment from './Sections/Comments'

const {kakao} = window;

function DetailPage(props) {

    const BoardId = props.match.params.BoardId //App.js에 있는 :fileId를 참조
    const [File, setFile] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [OpenMap, setOpenMap] = useState("")

    const fileVariable = {
        BoardId : BoardId
    }

    const openMap = () =>{
        setOpenMap(!OpenMap)
        
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

    const updateComment = (newComment) =>{
        setCommentLists(CommentLists.concat(newComment))
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

        axios.post('/api/comment/getComments',fileVariable)
        .then(response=>{
            if(response.data.success){
                setCommentLists(response.data.comments)
            }else{
                alert("댓글 가져오는데 실패했습니다")
            }
        })

        
    },[])

    return (
        <div className="postPage" style={{position: 'absoulte', padding: '10rem 9em', background: 'rgba(0,0,0,0.4)'}}>
            <div style={{background:"#E6E6E6",padding: '5em 10em'}}>
                <div style={{left: '50%', top:'50%'}}>
                <button onClick={BackPage}>exit</button>
             <br />
             <img style={{width: '50vw', height: '40vw',padding: '1em'}} src={`http://localhost:5000/${File.filepath}`}></img>
            
             <div id="map" style={{width: '40vw', height:'30vw',padding: '1em'}}></div>
             <button onClick={openMap}>맵열기</button>
             <List.Item 
                actions={[]}
             >
                <List.Item.Meta
                    avatar={<Avatar src />}
                    title={<a style={{ fontSize:'30px'}} href="https://ant.design">{File.title}</a>}
                    description={<p style={{ fontSize:'20px'}}>{File.content}</p>}
                />
                <div></div>
                
             </List.Item>
             <Comment CommentLists = {CommentLists} postId={File._id} refreshFunction={updateComment}/>
                </div>

            </div>

            
        </div>

    )
}

export default DetailPage
