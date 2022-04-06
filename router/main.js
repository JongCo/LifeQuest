const fs = require("fs");
const path = require("path");
const { send } = require("process");

const sessionChecker = function(req, res, next){
    console.log("ASD" + req.session.logined);
    if(req.session.logined){
        next();
    } else {
        res.send("로그인해주시요");
    }
}

module.exports = function(app, db){

    app.get('/', function(req, res){
        res.render('login.html');
    });


    
    app.post('/login', function(req, res){
        const username = req.body.username;
        const password = req.body.password;
        
        //이 일련의 과정을 간단하게 만들고 싶다.
        fs.readFile(path.join(__dirname,"..", "queries", "select_users.sql"), (err, data) => {
            console.log(err);
            if(err){
                res.status(500).send("DB연결문제");
            } else {
                db.get(data.toString(), username, (err, row) => {
                    if(err){
                        console.log("main.js:21 " + err);
                        res.status(500).send("문제감지");
                    } else {
                        if(password == (row && row.password)){
                            req.session.regenerate(function(){
                                req.session.logined = true;
                                req.session.user_id = req.body.username;
                                res.send("success");
                            })
                        } else {
                            res.send("login failed");
                        }
                    }
                });
            }
        })
    });
    
    app.get('/signup', function(req, res){
        res.render('signup.html');
    });
    
    app.post('/signup', function(req, res){
        const username = req.body.username;
        const password = req.body.password;
        
        fs.readFile(path.join(__dirname,"..", "queries", "insert_users.sql"), (err, data) => {
            console.log(err);
            if(err){
                res.status(500).send("DB연결문제");
            } else {
                db.run(data.toString(), username, password, err => {
                    if(err && err.errno == 19){
                        res.status(500).send("해당 아이디는 이미 있습니다");
                    } else if(err){
                        console.log("main.js:49 " + err);
                        res.status(500).send("문제감지");
                    } else {
                        res.send("회원가입완료");
                    }
                });
            }
        })
        
    });

    app.use(sessionChecker);
    
    app.get('/app', function(req, res){
        console.log(req.session.logined);
        res.render('app.html');
    });
    
}