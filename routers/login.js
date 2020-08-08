const express = require("express");

module.exports = (function () {
    const login = express.Router();
    login.get('/login', (req, res) => {
        res.render("login");

    })
    return login;
})()