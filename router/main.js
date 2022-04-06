const res = require("express/lib/response")

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('login.html');
    });

    app.post('/login', function(req, res){
        const id = req.body.username;
        const pwd = req.body.password;
        console.log("router/main.js:11 " + req.body.toString());
        res.send(["id : " + id,
                  "pwd : " + pwd].join('\n'));
    });

    app.get('/about', function(req,res){
        res.render('about.html');
    });
}