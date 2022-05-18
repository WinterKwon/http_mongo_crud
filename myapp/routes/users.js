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
router.post('/signup',body('email').isEmail().withMessage('아이디는 email 형식을 따르셔야합니다'), body('password').isLength({min:5}).withMessage('비밀번호는 최소 5글자 이상입니다.'),async (req,res)=>{
 const email = req.body.email;
 const password = req.body.password;
 const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      errors : errors.array()
    })
  }
   //중복된 이메일 계정 처리
  //동시 10, 1000명 가입도 가능. 테스트 환경과는 다름
  const findresult = await userSchema.findOne({email : email});
  if(!findresult){
    //복호화 및 가입완료
    const salt = bcrypt.genSaltSync(10);
    const bcryptpw = bcrypt.hashSync(password, salt);

    userSchema.create({
      email : email,
      password : bcryptpw
    }).then(result => {
      console.log(result); //실제 배포시엔 주석처리해야함
      res.status(200).json(result);
    });
  } else{
    res.status(401).json({msg: '이미 가입된 계정입니다.'});

  }


 

  //SNS로그인
  //이메일인증
  //passport.js
});

//로그인 관련해서도 위의 검증 인자 사용 가능
router.post('/login', async(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;

  //가입했던 유저인지 아닌지
  const userdata = await userSchema.findOne({email:email}).exec();

  if(!userdata){
    return res.status(401).json({msg:'가입되지 않은 계정입니다.'})
  } else {
    const pwMatch = bcrypt.compareSync(password, userdata.password);
    if(pwMatch){
      res.status(200).json({msg:'OK'}) 
       } else {
         res.status(401).json({msg : "비밀번호가 일치하지 않습니다."});
       }

  }


});

router.get('/login', (req,res)=>{
  res.render('blog/login');
});


//쿠키와 세션

module.exports = router;
