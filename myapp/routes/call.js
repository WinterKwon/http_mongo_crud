
const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=> {
    console.log("test express");
    res.send('Hello Express!');

    next();// 현재 미들웨어의 기능을 마치고 다음 미들웨어로 연결해준다.
});

// router.get('/', (req,res,next)=> {
//     console.log("test 2nd express");
    
// });

//API문서 작성
// 함수는 post, url /test/member/:id
// 파라미터
router.get('/member', (req,res,next)=> {
    res.send('call member');
    
});

router.get('/member/:id', (req,res)=>{
    const member = req.params.id;  // ./member/name으로 설정했다면 req.params.name으로 
    console.log(member);
    res.send(`${member}`)
    // res.send(`${name}`)  //depricated . router.get('/member/:id/:name'는 못 쓰는 듯
})

module.exports = router;

