var express = require('express');
var router = express.Router();
const userSchema = require('../models/newuser');

const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('blog/auth');
});

//email, password 형식 맞는지 검증하기 위해 중간인자 body()메서드 이용
//passport.js도 같은 기능
router.post('/signup',body('email').isEmail(), body('password').isLength({min:5}), (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors : errors.array()
    })
  }
})

module.exports = router;
