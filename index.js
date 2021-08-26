const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require("./server/config/key.js")
const cors = require('cors');


//카카오api 를 허용하기위한 cors
const options={
  origin: 'http://dapi.kakao.com/v2/maps/sdk.js',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(options))

//application/x-www-form-unlencoded 정보를 받아주기 위함
app.use(bodyParser.urlencoded({extended: true}))
//application/json 정보를 받아주기 위함
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/users', require('./server/routes/users'))
app.use('/api/board', require('./server/routes/uploads'))
app.use('/api/comment',require('./server/routes/comment'))
app.use('/uploads', express.static('uploads'))

//빌드 시 express 가 실행되도록 하는 코드
//app.use(express.static(path.join(__dirname, './client/build')))


const mongoose = require('mongoose')
const { read } = require('node-id3')
// const { createTrue } = require('typescript')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err=> console.log(err))



  //아마 빌드 시에 필요한 코드인것 같다
  if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))

    app.get("*", (req,res)=>{
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
  }



app.listen(port,() => console.log(`Example app listening on port ${port}!`))