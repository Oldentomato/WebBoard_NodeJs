const express = require('express')
const router = express.Router()
const multer = require('multer')
const {Board} = require("../models/Board")



var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null,'uploads/')
    },
    filename: function(req, file, cb){
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if(ext !=='.jpg' || ext !== '.mp4'){
        return cb(res.status(400).end('only png or mp4 file is allowed'),false);
      }
      cb(null,true)
    }
  })
  
  var upload = multer({storage: storage}).single("file")
  
  router.post("/uploadinfo",(req,res)=>{
      const board = new Board(req.body)

      board.save((err, board)=>{
          if(err)return res.status(400).json({success: false, err})
          return res.status(200).json({ success: true})
      })
    
  })

  router.post("/uploadfiles",(req,res)=>{
      upload(req,res, err =>{
          if(err){
              return res.json({ success: false, err})
          }else{
              res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
          }
      })
  
})

  module.exports = router
  