const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  activity_type:{
    type: String,
    enum:['run','bicycle','walk','swim','hike'],
    required: true
  },
  duration:{
    type: Number,
    required: true
  },
  date:{
    type:Date,
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  }
})

module.exports = Exercise = mongoose.model("exercise", exerciseSchema)