const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

//블로그 글 제목, 글 내용
//autoincrement는 사용히 접속 초기화를 한번 해줘야 한다
autoIncrement.initialize(mongoose);

const blog = new Schema({
    title : {
        type : String,
        required : true,
    }, 
    content : {
        type : String,
        required : true
    },
    no : Number,
}, {timestamps : true});

blog.plugin(autoIncrement.plugin, {
    model: 'blog',
    field : 'no',
    startAt: 4,
    increment : 1

})

const blogmodel = mongoose.model('blog', blog);

module.exports = blogmodel;