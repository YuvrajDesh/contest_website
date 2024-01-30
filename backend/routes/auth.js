const express = require('express');
const app = express()
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'isagoodb$oy';


router.post('/createuser', [
    body('phoneNo', 'Enter a valid 10-digit phone number').isNumeric().isLength({ min: 10, max: 10 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 3 characters').isLength({ min: 3 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry, a user with this email already exists" });
      }
 
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(req.body.password, salt);
 
      // Create a new user
      user = await User.create({
        phoneNo: req.body.phoneNo,
        password: hash,
        email: req.body.email,
        userType: req.body.userType
      });
 
      const data = {
        user: {
          id: user.id
        }
      };
 
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);
 
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Some Error occurred");
   }
 });

 module.exports = router

 