const express = require('express')
const router = express.Router()
const {Like} = require('../models/Like')


router.post('/getLikes', (req,res)=>{
    let variable ={}
    if(req.body.commentId){
        variable = {commentId: req.body.commentId}
    }else{
        variable = {boardId: req.body.boardId, commentId:undefined}
    }

    Like.find(variable)
    .exec((err,likes)=>{
        if(err)return res.status(400).send(err);
        res.status(200).json({success:true, likes})
    })
})

router.post('/upLike', (req,res)=>{
    let variable ={}
    if(req.body.commentId){
        variable = {boardId: req.body.boardId, commentId: req.body.commentId, userId: req.body.userId}
        
    }else{
        variable = {boardId: req.body.boardId, userId: req.body.userId}
    }

    const like = new Like(variable)

    like.save((err,likeResult)=>{
        if(err)return res.json({success: false, err})
        res.status(200).json({success:true})
    })
})

router.post('/unLike', (req,res)=>{
    let variable ={}
    if(req.body.commentId){
        variable = {boardId: req.body.boardId, commentId: req.body.commentId, userId: req.body.userId}
        
    }else{
        variable = {boardId: req.body.boardId, userId: req.body.userId, commentId:undefined}
    }

    Like.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err)return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    })
})

router.post('/deleteLike', (req,res)=>{//댓글좋아요도 없애는 기능넣어야함
    Like.deleteMany({boardId:req.body.BoardId},(err)=>{
        if(err)return res.json({success:false, err})
        return res.json({success: true})
    })
})

module.exports = router;