
const jwt = require('jsonwebtoken')
const {SecretKey} = require('../db/keys')

module.exports = function(req,res,next){
  console.log(req.cookie)
  const tokens = req.cookies.token;

  if(!tokens){
    return res.status(401).json({msg: 'No token, authorization denied'})
  }

  try{
    const decoded = jwt.verify(tokens, SecretKey)
    req.user = decoded.user
    next()
  }catch(e){
    res.send(e.message)
  }
}