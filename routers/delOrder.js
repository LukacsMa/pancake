const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

const session = require('express-session');

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));


module.exports = (function () {

    const delOrder = express.Router();
    const models = require("./../models");

    delOrder.post("/delOrder", (req, res) => {
        let id = req.body.userId;
        models.User.findByIdAndUpdate(id, {
           order : []
        }, err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect("admin/user");
            }
        })
    })
    return delOrder; 
})()