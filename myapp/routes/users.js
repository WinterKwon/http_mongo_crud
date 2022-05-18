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
router.post('/signup',body('email').isEmail().withMessage('아이디는 email 형식을 따르셔야합니다'), body('password').isLength({min:5}).withMessage('비밀번호는 최소 5글자 이상입니다.'), (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors : errors.array()
    })
  }

  //복호화
  const salt = bcrypt.genSaltSync(10);
  const bcryptpw = bcrypt.hashSync(req.body.password, salt);

  userSchema.create({
    email : req.body.email,
    password : bcryptpw
  }).then(result => {
    res.status(200).json(result);
  });

});

module.exports = router;
