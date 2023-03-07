
const express = require('express')
const auth = require('../../middleware/auth')
const route = express()
const Excer = require('../../models/exercise')

route.post('/add',auth,async(req,res)=>{
  if(req.user == null){
    res.send("no authenticate")
  }
  else{
    const {name, description, activity_type, duration, date,userId} = req.body

    try {
      const result = await Excer.create({name,description,activity_type,duration,date,userId})
      res.send('added')
    } catch (e) {
      res.send(e.message)
    }
  }
})

module.exports = route