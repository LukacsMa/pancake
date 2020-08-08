const express = require("express");

module.exports = (function () {
    const contact = express.Router();
    contact.get('/contact', (req, res) => {
        res.render("contact");

    })
    return contact;
})()