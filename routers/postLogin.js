const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

module.exports = (function () {

    const postLogin = express.Router();
    const models = require("./../models");
    let sess;

    postLogin.post("/postLogin", (req, res) => {
        sess = req.session;
        sess.email = req.body.email;
        const email = req.body.email;
        const password = req.body.password;

        models.User.findOne({
            email: email
        }, (err, foundUser) => {
            if (err) {
                res.send(err)
            } else {
                if (foundUser) {
                    if (foundUser.password === password) {
                        res.redirect("order")
                    } else {
                        res.send("hibás felhasználó név vagy jelszó")
                    }
                }
            }
        })
    })
    return postLogin;
})()