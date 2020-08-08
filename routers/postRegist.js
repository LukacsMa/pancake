const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postAdmin = require('./postAdmin');
app.use(bodyParser.urlencoded({
    extended: false
}))


module.exports = (function () {

    const postRegist = express.Router();
    const models = require("./../models");
    postRegist.post("/regist", (req, res) => {

        let newemail = req.body.email;
        let emails = [];
        models.User.find({}, (err, users) => {
            users.forEach((user) => emails.push(
                user.email
            ));

            if (!emails.includes(newemail)) {
                const user = new models.User({
                    name: req.body.yourName,
                    email: req.body.email,
                    city: req.body.city,
                    street: req.body.street,
                    houseNumber: req.body.houseNumber,
                    password: req.body.password
                })

                user.save((err) => {
                    if (!err) {
                        res.redirect("login")
                    } else {
                        console.error(err);
                    }
                });

            } else {
                res.redirect("error")
            }
        })
    })
    return postRegist;
})();