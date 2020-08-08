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

    const adminGetMenu = express.Router();
    const models = require("./../models");
    let sess;

    adminGetMenu.get("/admin/addMenu", (req, res) => {
        sess = req.session;
        if (sess.name) {
            let myBottoms = []
            let myFillings = [];
            let myToppings = [];

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


                                    res.render("admin/addMenu", {
                                        bottoms: myBottoms,
                                        fillings: myFillings,
                                        toppings: myToppings
                                    });

                                })
                            })
                        })
                    })
                })
            })
        } else {
            res.render("admin/admin")
        }
    })
    return adminGetMenu;
})();