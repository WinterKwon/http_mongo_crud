const BookSchema = require('../models/book');

const infoController = (req,res) => {
    const authorname = req.params.id;
    BookSchema.find({author: authorname})
    .then(result => {
        res.json(result);
    }).catch(err=>{
        console.log(err);
    })
}


const addbookController = (req,res)=>{
    const name = req.body.bookname;
    const author = req.body.author;
    const price = req.body.price;
    
    const date = req.body.date;
    
    // res.json({name:name, author:author, price:price, date:date})
    let bookData = new BookSchema({
        bookname : name,
        author : author,
        price : price,
        publish: date
    })
    bookData.save(); //mongoose에 저장
    res.redirect('/expost')

};
module.exports = {infoController, addbookController};

