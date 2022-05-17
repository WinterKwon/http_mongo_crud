const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const book = new Schema({
    bookname : String,
    author :String,
    price : {
        type : Number,
        default : 10000
    },
    publish : Date,
    sales: {
        type:Boolean,
        default : false,
    }
})

const bookData = mongoose.model('bookinfo',book); //'book'은 컬렉션이름 지어주는 것이고, 두번째는 위에서 schema로 작성한 데이터 
module.exports = bookData;