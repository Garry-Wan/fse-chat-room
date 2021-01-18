const express = require('express');
const bodyParser = require('body-parser');
const db = require('../../model/creatdb');
const util = require('../../common/util');
const user = express();
user.use(bodyParser.urlencoded({extended: false}))
user.post('/login',((req, res) => {
    let login = req.body
    db.getUser(login.username, (err, doc) => {
        if(err){
            res.send(JSON.stringify(util.failMessage(err.message)))
        }else {

            if(!doc){
                res.send(JSON.stringify(util.failMessage("username is not exist")))
                return
            }
            doc = doc._doc;
            if(doc.password === login.password){
                res.send(JSON.stringify(util.success(doc)))
                // msg.connect();
            }
            else {
                res.send(JSON.stringify(util.failMessage("username or password is incorrect")))
            }
        }
    })
}))
user.post('/create',((req, res) => {
    let create = req.body
    db.createUser(create, (err, doc) => {
        if(err){
            let a = util.failMessage(err.message)
            console.log(err.message)
           res.send(JSON.stringify(util.failMessage(err.message)))
        }else {
            res.send(JSON.stringify(util.success(null)))
        }
    })
}))
user.post('/update', (req, res) => {
     res.send(req.body)

})
user.get('/findAllUser',((req, res) => {
    db.findAllUser( (err, doc) => {
        if(err){
            res.send(JSON.stringify(util.failMessage(err.message)))
        }else {
            res.send(JSON.stringify(util.success(null)))
        }
    })
}))
module.exports = user;
