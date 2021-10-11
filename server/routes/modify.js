const express = require("express")
const router = express.Router()
const {Board} = require("../models/Board")
const fs = require('fs')

const {auth} = require("../middleware/auth")

router.post('/getContent',(req,res)=>{
    Board.findByIdAndUpdate({_id: req.body.postId},{
        title: req.body.title,
        content: req.body.content
    },
        (err,result)=>{
            if(err)return res.json({success:false, err})
            return res.status(200).send({
                success:true
            })
        })
})

router.post('/deleteContent',(req,res)=>{
    fs.unlink(req.body.FilePath,(err)=>{
        if(err){
            console.log("파일 삭제 Error 발생")
        }
        Board.findOneAndDelete({_id:req.body.BoardId},(err) =>{
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true})
        })
    })


})

router.post('/deleteImg',(req,res)=>{
    fs.unlink(req.body.FilePath,(err)=>{
        if(err){
            console.log("사진 삭제 Error")
        }
        return res.status(200).json({success: true})
    })
})

module.exports = router;