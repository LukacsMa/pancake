const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));


module.exports = (function () {

    const menu = express.Router();
    const models = require("./../models")

    menu.get("/menu", (req, res) => {
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

                                res.render("menu", {
                                    bottoms: myBottoms,
                                    fillings: myFillings,
                                    toppings: myToppings
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    return menu;
})()