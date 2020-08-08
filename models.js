const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false);

const models = {};

const adminSchema = {
    name: String,
    password: String
};

models.Admin = mongoose.model('Admin', adminSchema);


const userSchema = {
    name: String,
    email: String,
    city: String,
    street: String,
    houseNumber: Number,
    password: String,
    order: Array
};

models.User = mongoose.model("User", userSchema);

const menuSchema = {
    name: String,
    price: Number
};

models.Bottom = mongoose.model('Bottom', menuSchema);
models.Filling = mongoose.model('Filling', menuSchema);
models.Topping = mongoose.model('Topping', menuSchema);

module.exports = models;