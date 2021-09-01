const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    commentId:{
        type: Schema.Types.ObjectID,
        ref:'Comment'
    },
    boardId:{
        type: Schema.Types.ObjectID,
        ref:'Board'
    }
},{timestamps: true})

const Like = mongoose.model('Like',likeSchema)

module.exports = {Like}