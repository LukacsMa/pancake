const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

exports.addTopping = (function () {

    const addTopping = express.Router();
    const models = require("./../models")


    addTopping.post("/addTopping", (req, res) => {
        const topping = new models.Topping({
            name: req.body.toppingName,
            price: req.body.toppingPrice
        });

        topping.save((err) => {
            if (!err) {
                res.redirect("admin/addMenu")
            } else {
                console.error(err);
            }
        });
    })
    return addTopping;
})()


exports.delTopping = (function () {

    const delTopping = express.Router();
    const models = require("./../models")

    delTopping.post("/delTopping", (req, res) => {
        let toppingId = req.body.toppingId;
        models.Topping.findByIdAndRemove(toppingId, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("admin/addMenu");
            }
        })
    })
    return delTopping
})()

exports.editTopping = (function () {

    const editTopping = express.Router();
    const models = require("./../models")


    editTopping.post("/editTopping", (req, res) => {
        let toppingName = req.body.toppingName;
        let toppingPrice = req.body.toppingPrice;
        let toppingId = req.body.toppingId;
        models.Topping.findByIdAndUpdate(toppingId, {
            name: toppingName,
            price: toppingPrice
        }, err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect("admin/addMenu");
            }
        })
    })
    return editTopping
})()