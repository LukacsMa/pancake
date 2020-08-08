const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

exports.addFilling = (function () {

    const addFilling = express.Router();
    const models = require("./../models")


    addFilling.post("/addFilling", (req, res) => {
        const filling = new models.Filling({
            name: req.body.fillingName,
            price: req.body.fillingPrice
        });

        filling.save((err) => {
            if (!err) {
                res.redirect("admin/addMenu")
            } else {
                console.error(err);
            }
        });
    })
    return addFilling
})()

exports.delFilling = (function () {

    const delFilling = express.Router();
    const models = require("./../models")

    delFilling.post("/delFilling", (req, res) => {
        let fillingId = req.body.fillingId;
        models.Filling.findByIdAndRemove(fillingId, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("admin/addMenu");
            }
        })
    })
    return delFilling;
})()


exports.editFilling = (function () {

    const editFilling = express.Router();
    const models = require("./../models")

    editFilling.post("/editFilling", (req, res) => {
        let fillingName = req.body.fillingName;
        let fillingPrice = req.body.fillingPrice;
        let fillingId = req.body.fillingId;
        models.Filling.findByIdAndUpdate(fillingId, {
            name: fillingName,
            price: fillingPrice
        }, err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect("admin/addMenu");
            }
        })
    })
    return editFilling;
})()