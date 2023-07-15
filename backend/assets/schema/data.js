const mongoose=require('mongoose')

const dataSchema =mongoose.Schema({
    "img-src":String,
    "title":String,
    "desc":String,
    "link":String
})

module.exports=mongoose.model('data',dataSchema)