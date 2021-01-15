const moment = require('moment')
const mongoose = require('mongoose');
const  databaseUrl = 'mongodb://119.23.203.94:27017'
const  options ={
    useNewUrlParser: true,
    user: 'admin',
    pass: '123456',
    dbName: 'chat'
}
mongoose.connect(databaseUrl, options)
    .then(() => console.log('database connect success'))
    .catch((err) => console.log('database connect fail'+err))

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    creatTime:{
        type: String,
        required: true
    },
    updateTime:{
        type: String,
        required: true
    },

}
);
const msgSchema = new mongoose.Schema({
        sender: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20
        },
        msg: {
            type: String,
            required: true
        },
        creatTime:{
            type: String,
            required: true
        },

    }
);
const User = mongoose.model('user', userSchema);
const Msg = mongoose.model('msg', msgSchema);
const db ={}
db.createUser =function (user,callback) {
    user.creatTime = moment().format('MMMM Do YYYY, h:mm:ss');
    user.updateTime = moment().format('MMMM Do YYYY, h:mm:ss');
    user.state = 0;
    let dbUser = User.create(user, callback)
    console.log(dbUser)
}

db.createMsg =function (data,callback) {
    let senderMsg = {}
    // senderMsg.creatTime = new Date();
    senderMsg.creatTime = moment().format('MMMM Do YYYY, h:mm:ss')
    senderMsg.sender = data.username;
    senderMsg.msg = data.msg
    let dbMsg = Msg.create(senderMsg, callback)
    console.log(dbMsg)
}

db.getUser =function (username,callback) {
    User.findOne({username: username},callback)
}
db.findAllUser = function (callback) {
    User.find({},callback)
}
db.findAllMsg = function (callback) {
    Msg.find({},callback)
}
module.exports = db;