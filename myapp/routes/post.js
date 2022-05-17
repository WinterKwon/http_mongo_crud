const express = require('express')
const router = express.Router();
const BookSchema = require('../models/book');

const BookController = require('../controller/post');

router.get('./del', (req,res)=>{
    res.render('delete')
})

// //controller로 대체
// router.get('/bookinfo/:id', (req,res)=>{
//     const authorname = req.params.id;
//     //Movie.find({ year: { $gte: 1980, $lte: 1989 } });
//     // BookSchema.findone({author: authorname}, (err,result)=>{
//     //     if(result){
//     //         return res.json(result);
//     //     } else {
//     //         return res.send('등록된 작가가 없습니다.')
//     //     }
//     // })
//     BookSchema.find({author: authorname})
//         .then(result => {
//             res.json(result);
//         }).catch(err => {
//             console.log(err);
//         })
// });
router.get('/bookinfo/:id', BookController.infoController)

router.delete('./del/:id', (req,res)=>{
    const bookname = req.params.id;
    BookSchema.findOneAndDelete({bookname:bookname})
    .then( result => {
        res.json({redirect:'/expost'})
    }).catch(err => {
        console.log(err)
    })
})


router.get('/', (req,res)=>{
    res.render('post');
});

// router.post('/', (req,res,next)=>{
//     const name = req.body.name;
//     const phone = req.body.phone;
//     const date = req.body.date;
//     //response응답
//     //웹 통신은 1요청 1응답 후 통신이 종료된다.
//     //res.json()은 주석처리하지 않으면 아래 redirect 안됨. 한번 응답하고 종료되므로
//     // res.json({name:name, phone:phone, date:date})

//     res.next();

// });

//controller로 대체
// router.post('/addbook', (req,res)=>{
//     const name = req.body.bookname;
//     const author = req.body.author;
//     const price = req.body.price;
    
//     const date = req.body.date;
    
//     // res.json({name:name, author:author, price:price, date:date})
//     let bookData = new BookSchema({
//         bookname : name,
//         author : author,
//         price : price,
//         publish: date
//     })
//     bookData.save(); //mongoose에 저장
//     res.redirect('/expost')

// });
router.post('/addbook', BookController.addbookController);

// router.post('/', (req,res)=>{
//     // res.redirect는 호출한 경로로 재접근하라는 의미
//     res.redirect('/expost');
// });


//rest api 작성. mongoDB의 bookinfo의 모든 내용 가져오기
router.get('/getlist', async(req,res)=> {
    const result = await BookSchema.find({}).exec();  //전체목록은 {}로 find하고 .exec()꼭 붙여야 한다.
    return res.status(200).json(result);
})


//error핸들링
router.get('/users', (req,res)=>{
    res.render('user');
});

router.post('/users', async(req,res,next)=>{
    try {
        const userid = req.body.userid;
        const job = req.body.job;
        const user = new userSchema({
                userid : userid,
                job : job
        });
        const resuilt = await user.save();
        res.status(200).json({
            result,
            message : 'user saved'
        });
    } catch (error){
        console.log(error);
        next(error);
    }
})

module.exports = router;