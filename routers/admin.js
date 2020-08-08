const express = require("express");

module.exports = (function () {
    const admin = express.Router();
    admin.get('/admin/admin', (req, res) => {
        res.render("admin/admin");

    })
    return admin;
})()