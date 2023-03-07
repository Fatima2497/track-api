const express = require("express");
const {  check, validationResult } = require("express-validator");
const routes = express.Router();

const bcrypt = require("bcryptjs");
// Schemas
const User = require("../../models/user");


routes.post(
  "/register",
  [
    check("fullName", "FullName is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      }
      const salt = await bcrypt.genSalt(11);
      const hashPassword =  await bcrypt.hash(req.body.password, salt);
      

      let users = await new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashPassword,
      });

      const result = await users.save()
      
      res.send(result);
      
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

module.exports = routes;
