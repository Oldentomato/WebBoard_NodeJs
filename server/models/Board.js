const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    filepath:{
        type: String,
        maxlength: 200
    },
    title:{
        type: String,
        maxlength: 50
    },
    content:{
        type: String,
        maxlength: 100
    },
    views:{
        type: Number,
        default: 0
    },
    latitude:{
        type: Number
    },
    longitude:{
        type: Number
    },
    username:{
        type: String
    }
},{timestamps: true})

const Board = mongoose.model('Board',boardSchema)

module.exports = {Board}