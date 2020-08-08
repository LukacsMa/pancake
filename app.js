const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');
const app = express();

let port = process.env.PORT;

if(port == null || port == ""){
    port = 3000;
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));

app.use('/', router);

router.get('/', (req, res) => {
    res.render("index");
})

const Regist =  require('./routers/regist');
router.use('/', Regist);

const Order =  require('./routers/order');
router.use('/', Order);

const Menu =  require('./routers/menu');
router.use('/', Menu);

const PostOrder =  require('./routers/postOrder');
router.use('/', PostOrder);

const DelOrder =  require('./routers/delOrder');
router.use('/', DelOrder);

const Contact =  require('./routers/contact');
router.use('/', Contact);

const Login =  require('./routers/login');
router.use('/', Login);

const PostLogin =  require('./routers/postLogin');
router.use('/', PostLogin);

const Admin =  require('./routers/admin');
router.use('/', Admin);

const AdminEdit =  require('./routers/adminedit');
router.use('/', AdminEdit);

const Error =  require('./routers/error');
router.use('/', Error);

const PostAdmin = require('./routers/postAdmin');
router.use('/', PostAdmin);

const PostRegist = require('./routers/postRegist');
router.use('/', PostRegist);

const AdminGetUsers = require('./routers/adminGetUsers');
router.use('/', AdminGetUsers);

const AdminGetMenu = require('./routers/adminGetMenu');
router.use('/', AdminGetMenu);

const {addBottom, delBottom, editBottom} = require('./routers/bottom');

router.use('/', addBottom);
router.use('/', delBottom);
router.use('/', editBottom);

const {addTopping, delTopping, editTopping} = require('./routers/topping');

router.use('/', addTopping);
router.use('/', delTopping);
router.use('/', editTopping);

const {addFilling, delFilling, editFilling} = require('./routers/filling');

router.use('/', addFilling);
router.use('/', delFilling);
router.use('/', editFilling);