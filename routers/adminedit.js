const express = require("express");

module.exports = (function () {
    const adminEdit = express.Router();
    adminEdit.get('/admin/adminedit', (req, res) => {
        res.render("admin/adminedit");

    })
    return adminEdit;
})()