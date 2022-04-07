const req = require("express/lib/request");
const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const { send } = require("process");
const db = require("../dbinit");

//예외처리 필요
//따로 모듈화하면 깔끔할 듯
function runDb( queryFileName, ...params){
    fs.readFile(path.join(__dirname, "..", "queries", queryFileName), (err, data) => {
        
        try{
            db.run(data.toString(), ...params)
        } catch(err) {
            console.log(err);
        }
        
    });
}


function selectDb( queryFileName, ...params){
    fs.readFile(path.join(__dirname, "..", "queries", queryFileName), (err, data) => {
        
        try{
            db.all(data.toString(), ...params)
        } catch(err) {
            console.log(err);
        }
    });
}



module.exports = function(app, db){

    app.get('/', function(req, res){
        res.redirect('./login');
    });

    //로그인 페이지
    app.get('/login', function(req, res){
        res.render('login.html');
    });

    //로그인 요청 처리
    app.post('/login', function(req, res){
        const username = req.body.username;
        const password = req.body.password;
        
        try {
            selectDb('select_users.sql', username, (err, rows) => {
                if(password == (rows[0] && rows[0].password)){
                    console.log("55");
                    req.session.regenerate(function(){
                        const token = Math.random().toString(36).substring(2, 11);
                        req.session.uid = rows[0].uid;
                        req.session.username = req.body.username;
                        req.session.token = token;
                        req.session.logined = true;
                        runDb('insert_tokens.sql', token, rows[0].uid, (err, data)=>{console.log(err || 0)});
                        res.send("success");
                    })
                } else {
                    res.send("login failed");
                }
            })
        } catch (err) {
            res.status(500).send(err);
        }

    });
    
    //회원가입 페이지
    app.get('/signup', function(req, res){
        res.render('signup.html');
    });
    
    /*회원가입 요청 처리
    * username : username
    * password : password */
    app.post('/signup', function(req, res){
        const username = req.body.username;
        const password = req.body.password;

        try {
            runDb('insert_users.sql', username, password, (err, data) => {
                if(!err){
                    //Client에게 성공했음을 알리는 더 좋은 방법 찾기
                    res.send("회원가입완료"); 
                } else {
                    res.status(500).json(err);
                }
            });
        } catch (err) {
            res.status(500).json(err);
        }
    });

    //로그인 세션 확인 미들웨어
    app.use(function(req, res, next){
        if(req.session.logined){
            console.log("seesion확인 : " + req.session.token);
            selectDb('select_token_by_username.sql', req.session.username, (err, rows) => {
                if ( rows && rows.findIndex( (element) => {
                    if(element.token === req.session.token) return true;
                }) != -1 ) {
                    next();
                } else {
                    res.redirect("./login");
                }
            })
        } else {
            res.redirect("./login");
        }
    });
    

    app.get('/app', function(req, res){
        console.log(req.session.logined);
        res.render('app.html');
    });


    /* todo목록 요청
    * response
    *   todoList: [{
    *       titleId: todo 식별번호
    *       title: todo 제목
    *       createDate: todo 생성일자
    *       success: todo 성공여부
    *   }, ...]  
    * 
    */
    app.get('/app/todo', (req, res) => {
        const uid = req.session.uid;

        selectDb('select_todo_list.sql', uid, (err, rows) => {
            if(!err){
                const todoList = [];
                rows.forEach(element => {
                    todoList.push({
                        titleId: element.title_id,
                        title: element.title,
                        createDate: element.createDate,
                        success: element.success
                    })
                });
                res.json({todoList: todoList});
            }
        })
    })


    /* 새로운 todo목록 생성
    * request
    *   title: todo제목
    * response
    *   todoList: [{
    *       titleId: todo 식별번호
    *       title: todo 제목
    *       createDate: todo 생성일자
    *       success: todo 성공여부
    *   }, ...]  
    *
    */
    app.post('/app/todo', function(req, res){
        const title = req.body.title;
        const uid = req.session.uid;

        console.log(title);
        console.log(uid);

        runDb('insert_todo.sql', title, uid, (err, data) => {
            if(!err){
                selectDb('select_todo_list.sql', uid, (err, rows) => {
                    if(!err){
                        const todoList = [];
                        rows.forEach(element => {
                            todoList.push({
                                titleId: element.title_id,
                                title: element.title,
                                createDate: element.createDate,
                                success: element.success
                            })
                        });
                        res.json({todoList: todoList});
                    } else {
                        res.status(500).json(err);
                    }
                })
                console.log(data);
            } else {
                console.log(err);
                res.status(500).json(err);
            }
        })
    });

    app.put('/app/todo/:titleid', function(req, res){
        const success = req.body.success;
        const uid = req.session.uid;
        const titleId = req.params.titleid;

        console.log(success);

        runDb('update_todo.sql', success.toString(), titleId, (err, data) => {
            if(!err){
                selectDb('select_todo_list.sql', uid, (err, rows) => {
                    if(!err){
                        const todoList = [];
                        rows.forEach(element => {
                            todoList.push({
                                titleId: element.title_id,
                                title: element.title,
                                createDate: element.createDate,
                                success: element.success
                            })
                        });
                        res.json({todoList: todoList});
                    } else {
                        res.status(500).json(err);
                    }
                });
            }
        });
    });

    /* todo목록 삭제
    * request
    *   :titleid  삭제할 todo 식별번호
    * response
    *   todoList: [{
    *       titleId: todo 식별번호
    *       title: todo 제목
    *       createDate: todo 생성일자
    *       success: todo 성공여부
    *   }, ...]  
    *
    */
    app.delete('/app/todo/:titleid', function(req, res){
        const titleId = req.params.titleid;
        const uid = req.session.uid;

        runDb('delete_todo.sql', titleId, (err, data) => {
            if(!err){
                selectDb('select_todo_list.sql', uid, (err, rows) => {
                    if(!err){
                        const todoList = [];
                        rows.forEach(element => {
                            todoList.push({
                                titleId: element.title_id,
                                title: element.title,
                                createDate: element.createDate,
                                success: element.success
                            });
                        });
                        res.json({todoList: todoList});
                    } else {
                        res.status(500).json(err);
                    }
                });
            } else {
                console.log(err);
                res.status(500).json(err);
            }
        });
        
    });

    app.use(function(req, res, next){
        res.render('notfound.html');
    });
    
}