const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const {User} = require("./models/User")
const config = require("./config/key.js")

//application/x-www-form-unlencoded 정보를 받아주기 위함
app.use(bodyParser.urlencoded({extended: true}))
//application/json 정보를 받아주기 위함
app.use(bodyParser.json())

const mongoose = require('mongoose')
// const { createTrue } = require('typescript')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err=> console.log(err))



app.get('/',(req,res) => res.send('Hello World! test'))


app.post('/register',(req,res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body)
  user.save((err,userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })//mongoDB method
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))