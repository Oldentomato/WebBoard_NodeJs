const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {User} = require("./models/User")
const config = require("./config/key.js")

//application/x-www-form-unlencoded 정보를 받아주기 위함
app.use(bodyParser.urlencoded({extended: true}))
//application/json 정보를 받아주기 위함
app.use(bodyParser.json())
app.use(cookieParser())

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

app.post('/login',(req,res)=>{
  User.findOne({email: req.body.email}, (err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //

    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch)
        return res.json({loginSuccess: false, 
          message: "비밀번호가 틀렸습니다."
        })
      //

      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err)

        //토큰을 저장한다. 쿠키, 로컬스토리지
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })

    })
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))