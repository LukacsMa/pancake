const express = require("express");

module.exports = (function () {
    const regist = express.Router();
    regist.get('/regist', (req, res) => {
        res.render("regist");

    })
    return regist;
})()