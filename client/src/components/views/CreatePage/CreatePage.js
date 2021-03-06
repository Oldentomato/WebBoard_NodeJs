import React,{useState, useEffect} from 'react'
import {Typography, Button, Form, Input} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import DropZone from 'react-dropzone'
import axios from 'axios'
import EXIF from 'exif-js'
import { useSelector } from 'react-redux'
import Loading from '../LoadingScene/Loading'


const {Title} = Typography;
const {TextArea} = Input;



function CreatePage(props) {
    const user = useSelector(state => state.user);

    const [title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [FilePath, setFilePath] = useState("");
    const [Latitude, setLatitude] = useState("");
    const [Longitude, setLongitude] = useState("");
    const [CautionGPS, setCautionGPS] = useState("");
    const [isImgUpload , setisImgUpload] = useState(false);

    const handleChangeTitle = (e) =>{
        setTitle(e.currentTarget.value)
    }

    const handleChangeContent = (e) =>{
        setContent(e.currentTarget.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        //정보 서버올림
        const variables = {
            writer: user.userData._id,
            filepath: FilePath,
            title: title,
            content: Content,
            latitude: Latitude,
            longitude: Longitude
        }
        if(title === "" || Content === "" || FilePath === ""){
            alert("내용을 모두 입력해주십시오")
        }else{
            axios.post('/api/board/uploadinfo',variables)
            .then(response =>{
                if(response.data.success){
                    alert("업로드에 성공했습니다")
                    window.location.replace("/Boards")
                }else{
                    alert('업로드에 실패했습니다')
                }
            })
        }               

    }

    useEffect(()=>{
        return ()=>{
            if(FilePath !== ""){
                axios.post('/api/modify/deleteImg',{FilePath:FilePath})
                .then(response=>{
                    if(response.data.success){
                        alert("사진삭제를 완료했습니다.")
                    }else{
                        alert("사진삭제에 실패했습니다")
                    }
                })
            } 
        }
    },[FilePath])


    const onDrop = (files) =>{
        //사진 서버올림
        setisImgUpload(true);
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        // console.log(files)
        formData.append("file",files[0])

        axios.post('/api/board/uploadfiles', formData, config)//나중에 리덕스로 바꿔줘야한다
        .then(response=>{
            if(response.data.success){
                setFilePath(response.data.filePath)
                setisImgUpload(false);
            }else{
                alert('failed to save the image in server')
            }
        })     
        EXIF.getData(files[0], function() {
                    
            if(EXIF.getTag(files[0], "GPSLongitude") !== undefined){
                var exifLong = EXIF.getTag(files[0], "GPSLongitude");
                var exifLat = EXIF.getTag(files[0], "GPSLatitude");
                var exifLongRef = EXIF.getTag(files[0], "GPSLongitudeRef");
                var exifLatRef = EXIF.getTag(files[0], "GPSLatitudeRef");

                var latitude;
                var longitude;
                

                //계산식 적용이유는 해당라이브러리가 위도경도를 도분초 단위로 출력하기 때문
                if (exifLatRef === "S") {
                    var latitude = (exifLat[0]*-1) + (( (exifLat[1]*-60) + (exifLat[2]*-1) ) / 3600);						
                } else {
                    var latitude = exifLat[0] + (( (exifLat[1]*60) + exifLat[2] ) / 3600);
                }
        
                if (exifLongRef === "W") {
                    var longitude = (exifLong[0]*-1) + (( (exifLong[1]*-60) + (exifLong[2]*-1) ) / 3600);						
                } else {
                    var longitude = exifLong[0] + (( (exifLong[1]*60) + exifLong[2] ) / 3600);
                }
                setCautionGPS("");
                setLatitude(latitude);
                setLongitude(longitude);
            }
            else{
                setCautionGPS("NO GPS INFO")
            }

        })


    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto '}}>
            <div style ={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} style={{color: '#fff'}}> Upload Content</Title>

            </div>
            {isImgUpload&&<Loading infostring="이미지 업로드중"/>}
            <Form>
                <div style={{display: 'flex', justifyContent: 'space-between' }}>
                    <DropZone 
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                            {({getRootProps, getInputProps})=>(
                                <div style={{width: '300px', height: '240px', border: '1px solid lightgray',display: 'flex',alignItems: 'center', justifyContent: 'center'}}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()}/>
                                    <PlusOutlined style={{fontSize: '3rem'}}/>
                                </div>
                            )}
                        </DropZone>
                        {FilePath}
                        <br />



                </div>
                <br /><br />
                <h2 style={{color: '#fff'}}>*업로드시 자동으로 이미지의 위치정보를 가져옵니다(EXIF가 필요)</h2>
                <br />
                {CautionGPS}
                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value = {title}
                />
                <br /><br />
                <label>Content</label>
                <TextArea
                    onChange = {handleChangeContent}
                    value = {Content}
                />
                 <br /><br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreatePage
