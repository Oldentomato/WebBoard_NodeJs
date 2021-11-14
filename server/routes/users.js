const express = require('express')
const router = express.Router()
const {User} = require("../models/User")
const {auth} = require("../middleware/auth")


router.post('/register',(req,res) => {
    //회원가입할때 필요한 정보들을 client에서 가져오면 
    //그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)
    
    user.save((err)=>{
      if(err) return res.json({success: false, err})
      return res.status(200).json({
        success: true
      })
    })//mongoDB method
  })
  
  router.post('/login',(req,res)=>{
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
    //res.sendFile(path.join(__dirname,'./client/build/index.html'))
  })
  //post는 req.body에 담아주지만
  //get은 body에 담지 않는다
  
  //auth = 미들웨어
  router.get('/auth', auth, (req,res)=>{
    //auth가 통과가 됐으면 서버에서 정보들을 가져와서 클라이언트에 치환한다
    //미들웨어는 양 쪽을 연결하여 데이터를 주고받을 수 있도록 중간에서 매개 역할을 하는 소프트웨어, 
    //네트워크를 통해서 연결된 여러 개의 컴퓨터에 있는 많은 프로세스들에게 어떤 서비스를 
    //사용할 수 있도록 연결해주는 소프트웨어
  
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true, //0이 아니면 어드민
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    })
    //res.sendFile(path.join(__dirname,'./client/build/index.html'))
  })
  
  router.get('/logout',auth,(req,res)=>{
    //get은 정보조회용이기에 내용이 바뀌지 않는다 
    //그러기에 findOneAndUpdate를 이용해 정보를 바꿔주는것이다
    User.findOneAndUpdate({_id: req.user._id},
      {token: ""}, (err,user)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
          success: true
        })
      })
      //res.sendFile(path.join(__dirname,'./client/build/index.html'))
  })

  router.get('/isonline',(req,res)=>{
    res.status(200).json({online: true})
    
  })

  module.exports = router