const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));


module.exports = (function () {

    const postOrder = express.Router();
    const models = require("./../models");
   
    postOrder.post("/postOrder", (req, res) => {
               
        let userId = req.body.userId;
        let sum = req.body.submitSum;
        let list = req.body.submitList;
        let orderDate = new Date();
    
        let newOrder = `${orderDate.toDateString()}\n${list}  ${sum}`;
        models.User.findByIdAndUpdate(userId, {
           $push : {order: newOrder}
        }, err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect("order");
            }
        })
    })
    return postOrder; 
})()