
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
        // receiver: {
        //     type: String,
        //     required: true,
        //     minlength: 2,
        //     maxlength: 20
        // },
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
const msg = mongoose.model('msg', msgSchema);
const db ={}
db.createUser =function (user,callback) {
    user.creatTime = new Date();
    user.updateTime = new Date();
    user.state = 0;
    let dbUser = User.create(user, callback)
    console.log(dbUser)
}

db.getUser =function (username,callback) {
    User.findOne({username: username},callback)
}
db.findAllUser = function (callback) {
    User.find({},callback)
}
module.exports = db;