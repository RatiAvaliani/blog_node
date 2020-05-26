let express = require('express');
let expressSession = require('express-session');
let bodyParser = require('body-parser');
let { Validator } = require('node-input-validator');

let app =  express();


const adminEmail = "test@login.com";
const adminPassword = "pass";

app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
app.use(express.static(__dirname + '/views'));
app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/admin', (req, res) => {
    if ( req.session.login === undefined || req.session.login === 0) res.redirect('/admin/login');

    res.render('admin/posts')
});

app.get('/admin/login', (req, res) => {
    if (req.session.login === 1) res.redirect('/admin/posts');

    res.render('admin/login');
});

app.get('/admin/logout', (req,res) => {
    req.session.login = 0;
    res.redirect('/admin/login');
});

app.post('/admin/login', (req, res) => {
    let loginValidator = new Validator(req.body, {
        email: "required|email",
        password: "required"
    });

    loginValidator.check().then((matched) => {

        if (!matched) {
            res.render('admin/login', {
                "error" : "provided input dose't match required parameters."
            });
        } else {
            if (req.body.email !== adminEmail || req.body.password !== adminPassword) {
                res.render('admin/login', {
                    "error" : "wrong email or password"
                });
            } else {
                req.session.login = 1;
                res.redirect('/admin/posts');
            }
        }
    });
});

app.get('/admin/posts', (req, res) => {
    if ( req.session.login === undefined || req.session.login === 0) res.redirect('/admin/login');
    res.render('admin/posts');
});

app.get('/admin/add-post', (req, res) => {
    if ( req.session.login === undefined || req.session.login === 0) res.redirect('/admin/login');

    res.render('admin/add-post');
});

app.get('/admin/edit-post', (req, res) => {
    if ( req.session.login === undefined || req.session.login === 0) res.redirect('/admin/login');

    res.render('admin/edit-post');
});

app.listen('80');