const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    postname:{
        type: String,
        maxlength: 50
    },
    content_image:{
        type: Image
    },
    content:{
        type: String,
        maxlength: 100
    },
    username:{
        type: String,
        maxlength: 50
    }
})

const Board = mongoose.model('Board',boardSchema)

module.exports = {Board}