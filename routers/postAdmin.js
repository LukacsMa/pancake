const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

module.exports = (function () {

    const postAdmin = express.Router();
    const models = require("./../models");
    let sess;

    postAdmin.post("/admin", (req, res) => {
        sess = req.session;
        sess.name = req.body.adminName;
        const name = req.body.adminName;
        const password = req.body.adminPassword;

        models.Admin.findOne({
            name: name
        }, (err, foundAdmin) => {
            if (err) {
                res.send(err)
            } else {
                if (foundAdmin) {
                    if (foundAdmin.password === password) {

                        res.redirect("admin/adminedit")
                    } else {
                        res.send("hibás felhasználó név vagy jelszó")
                    }
                }
            }
        })
    })
    return postAdmin;
})()