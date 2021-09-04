const express = require("express")
const router = express.Router()
const {Board} = require("../models/Board")

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

module.exports = router;