
const jwt = require('jsonwebtoken')
const {SecretKey} = require('../db/keys')

module.exports = function(req,res,next){
 
  // const tokens = req.cookies.token;
  const tokens = req.headers["auth"];
  console.log(tokens)

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