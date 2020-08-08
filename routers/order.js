const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
const session = require('express-session');
const {
    User
} = require('./../models');

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));


module.exports = (function () {

    const order = express.Router();
    const models = require("./../models");
    let sess;

    order.get("/order", (req, res) => {
        sess = req.session;
        if (sess.email) {
            let myBottoms = []
            let myFillings = [];
            let myToppings = [];

            let myUserName;
            let myUserId;

            models.User.findOne({email:sess.email}, (err, user) => {
                if (err){
                    res.send(error)
                }else {
                    myUserName = user.name;
                    myUserId = user.id;
                }
            })

            models.Bottom.deleteMany({
                price: null
            }, (err, result) => {
                if (err) {
                    res.send(err);
                }
                models.Topping.deleteMany({
                    price: null
                }, (err, result) => {
                    if (err) {
                        res.send(err);
                    }
                    models.Filling.deleteMany({
                        price: null
                    }, (err, result) => {
                        if (err) {
                            res.send(err);
                        }
                        models.Bottom.find({}, (err, bottoms) => {
                            bottoms.forEach((bottom) => {
                                myBottoms.push(bottom);
                            });
                            models.Filling.find({}, (err, fillings) => {
                                fillings.forEach((filling) => {
                                    myFillings.push(filling)
                                });
                                models.Topping.find({}, (err, toppings) => {
                                    toppings.forEach((topping) => {
                                        myToppings.push(topping)
                                    });

                                    res.render("order", {
                                        bottoms: myBottoms,
                                        fillings: myFillings,
                                        toppings: myToppings,
                                        userId: myUserId,
                                        userName : myUserName
                                    })
                                })
                            })
                        })
                    })
                })
            })
        } else {
            res.redirect("login")
        }
    })
    return order;
})()