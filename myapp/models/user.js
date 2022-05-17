
const {Schema} = require('mongoose');

const user = new Schema({
    userid : {
        type :String,
        required : true,
        unique : true
    },
    job : {
        type : String,
        required : true

    },
    
});

const userData = mongoose.model('users', user);
module.exports = userData;