const mongoose = require('mongoose')

const expSchema = new mongoose.Schema({
  cate:{
    type:String,
    required:true
  },
  amt:{
    type:Number,
    required:true
  },
  date:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('ExpData', expSchema)