const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator')
const User = require('../../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const {SecretKey} =require('../../db/keys')

router.post('/login',[
  check('email','Email is required').exists(),
  check('password','Password is required').isLength({min:6})
], async(req,res)=> {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }

  const {email,password} = req.body;

  try {
    let user = await User.findOne({email})

    if(!user){
      return res.status(400).json({error: [{msg: 'Invalid Credential'}]})
    };

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({error: [{msg: 'Password not match'}]})
    }

    const payload ={
      user:{
        id: user.id
      }
    }

    let token_auth = jwt.sign(payload,SecretKey)
    res.cookie("token",token_auth)

    // res.status(200).json({token_auth})
    console.log(token_auth)
    res.send("Login Successful")

  } catch (error) {
    res.send(error.message)
  }
})


router.post("/logout",(req,res)=>{
  res.cookie("token",null)
  res.send("Logout")
})
module.exports = router;