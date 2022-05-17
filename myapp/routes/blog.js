// localhost:3000

const  router = require('express').Router();
const blogSchema = require('../models/blog');

router.get('/', async (req,res)=>{
    const result = await blogSchema.find({}).exec();
    res.render('blog/blog', {content : result});
});

router.get('/read/:id', async (req,res)=>{
    const contentNo = req.params.id;
    // console.log(contentNo)  //안찍힘??
    const result = await blogSchema.findOne({no:contentNo}).exec();
    res.render('blog/blogcontent', {content:result});

});

router.get('/write', (req,res)=>{
    res.render('blog/write');
});

router.post('/write', (req,res)=>{
    const title = req.body.title;
    const content = req.body.content;

    const blogText = new blogSchema({
        title: title,
        content : content
    });

    blogText.save().then(result => {
        console.log(result);
        res.redirect('/blog');
    }).catch(err=>{
        console.log(err);
        next(err);
    })

})


router.delete('/delete/:id', (req,res,next)=>{
    const no = req.params.id;
    //async await하려면 const result = await blogShcma.find~ 이후에 result.then()
    blogSchema.findOneAndDelete({no:no}).then(result => {
        return res.status(200).json({redirect: '/blog'});  //list.js에서 다시 받아 동작 주고 받는 패턴 잘 기억해두고 쓰자. 브라우저의 메세지 받아서 작동해야할 때

    }).catch(err=>{
        // throw new Error("Error");
        console.log(err);

    })

});

router.get('/updateRead/:id', async(req,res)=>{
    const contentNo = req.params.id;
    const result = await blogSchema.findOne({no: contentNo}).exec();
    res.render('blog/blogupdate', {content: result});
})

router.post('/updateWrite/:id', async(req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    const no = req.params.id;
    await blogSchema.findOneAndUpdate({no: no} , {
        title : title,
        content : content
    }).exec();
//수정 완료 후 홈페이지로 이동

    const updateResult = await blogSchema.findOne({no:no}).exec();
    res.render('blog/blogcontent', {content: updateResult});
});




module.exports = router