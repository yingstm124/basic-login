const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');

const { getSignUppage, getLoginpage, getHomepage, Signup, IsLogined, Logout } = require('./routes');


var app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '27365410',
    database: 'BasicLogin'
});

global.db = db;

query = "SELECT * FROM users";
db.query(query, (err, result) => {
    if(err){
        console.log(err);
        throw err;
    }
    else {
        console.log('connected! db');
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(
    path.join(__dirname, 'public')
));
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/', getHomepage);
app.get('/login', getLoginpage);
app.get('/signup', getSignUppage);
app.post('/signup', Signup);
app.post('/auth', IsLogined);
app.get('/logout', Logout);

app.listen(PORT , () => {
    console.log("PORT " +PORT + " is working !!")
});

