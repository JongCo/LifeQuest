const path = require("path");

const express = require('express'); 
const session = require('express-session');
const app = express();
const port = 30000

app.set('views', path.join(__dirname,'/views')); 
app.set('view engine', 'ejs'); 
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'abcdefg',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use(express.text());
app.use(express.json());


const router = require('./router/main')(app);


const server = app.listen(port, function() {
    console.log(`Express server has started on port ${port}`);
})