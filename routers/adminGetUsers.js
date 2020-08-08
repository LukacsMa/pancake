const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));

module.exports = (function () {

    const adminGetUsers = express.Router();
    const models = require("./../models");
    let sess;

    adminGetUsers.get("/admin/user", (req, res) => {
        sess = req.session;
        if (sess.name) {
            let myUsers = [];
            models.User.find({}, (err, users) => {
                users.forEach((user) => {
                    myUsers.push(user)})
                        
                res.render("admin/user", {
                    users: myUsers
                })
            });
        } else {
            res.render("admin/admin")
        }
    });
    return adminGetUsers;
})()