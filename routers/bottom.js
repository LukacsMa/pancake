const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

exports.addBottom = (function () {

    const addBottom = express.Router();
    const models = require("./../models")


    addBottom.post("/addBottom", (req, res) => {
        const bottom = new models.Bottom({
            name: req.body.bottomName,
            price: req.body.bottomPrice
        });
        bottom.save((err) => {
            if (!err) {
                res.redirect("admin/addMenu")
            } else {
                console.error(err);
            }
        });

    })
    return addBottom
})();

exports.delBottom = (function delBottom() {

    const delBottom = express.Router();
    const models = require("./../models")


    delBottom.post("/delBottom", (req, res) => {
        let bottomId = req.body.bottomId;
        models.Bottom.findByIdAndRemove(bottomId, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("admin/addMenu");
            }
        })
    })
    return delBottom
})();

exports.editBottom = (function () {

    const editBottom = express.Router();
    const models = require("./../models")


    editBottom.post("/editBottom", (req, res) => {
        let bottomName = req.body.bottomName;
        let bottomPrice = req.body.bottomPrice;
        let bottomId = req.body.bottomId;
        models.Bottom.findByIdAndUpdate(bottomId, {
            name: bottomName,
            price: bottomPrice
        }, err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect("admin/addMenu");
            }
        })
    })
    return editBottom;
})();