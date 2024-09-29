
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId : {
        type : String,
        required : true,
        unique : true
    },
    redirectUrl : {
        type : String,
        required : true,
    },
    visitHistory : [ { timestamp : {
        type : Number
    }}],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
        
    
},{timestamps: true} )


const Url = mongoose.model('urlShortner',urlSchema)


module.exports = Url;