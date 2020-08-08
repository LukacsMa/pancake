const express = require("express");

module.exports = (function () {
    const error = express.Router();
    error.get('/error', (req, res) => {
        res.render("error");

    })
    return error;
})()