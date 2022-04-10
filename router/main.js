const jclqDbController = require("../dbinit");

module.exports = function(app){

    //메인 페이지 (로그인 페이지로 리다이렉션)
    app.get('/', function(req, res){
        res.redirect('./login');
    });


    /* 로그인 페이지 응답
    * response
    *   login.html */
    app.get('/login', function(req, res){
        res.render('login.html');
    });


    /* 로그인 요청 처리
    * request
    *   username: 로그인할 사용자 이름
    *   password: 로그인할 사용자 패스워드 (sha256) */
    app.post('/login', function(req, res){
        const username = req.body.username;
        const password = req.body.password;
        
        jclqDbController.selectUser(username).then( row => {
            if(password == row.password){
                req.session.regenerate( () => {
                    const token = Math.random().toString(36).substring(2, 11);
                    req.session.uid = row.uid;
                    req.session.username = req.body.username;
                    req.session.token = token;
                    req.session.logined = true;
                    jclqDbController.insertToken(token, row.uid).then( result => {
                        //TODO: status 200 상태만 전송하여 요청 성공함을 알려야 함
                        res.send("success");
                    }).catch( err => {
                        res.status(500).send(err);
                    })
                })
            } else {
                res.status(400).send({message: "아이디 혹은 비밀번호가 일치하지 않습니다."});
            }
        })

    });

    
    /* 회원가입 페이지 응답
    * response
    *   signup.html */
    app.get('/signup', function(req, res){
        res.render('signup.html');
    });

    
    /*회원가입 요청 처리
    * request
    *   username : username
    *   password : password */
    app.post('/signup', function(req, res){
        const username = req.body.username;
        const password = req.body.password;

        jclqDbController.insertUser(username, password).then( result => {
            console.log(result);
            res.end();
        }).catch( err => {
            res.status(500).json(err);
        })
    });


    //로그인 세션 확인 미들웨어
    app.use(function(req, res, next){
        const username = req.session.username;
        if(req.session.logined){
            console.log("seesion확인 : " + req.session.token);

            jclqDbController.selectTokenByUsername(username).then( rows => {
                delete rows.meta;
                if(rows.findIndex( element => {
                    if(element.token === req.session.token) return true;
                }) != -1 ){
                    next();
                } else {
                    res.redirect("/login");
                }
            });
        } else {
            res.redirect("/login");
        }
    });
    

    /* todo 메인페이지 응답
    * response
    *   app.html
    */
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

        jclqDbController.selectTodoList(uid).then( rows => {
            const todoList = [];
            delete rows.meta;
            console.log(rows);
            rows.forEach(element => {
                todoList.push({
                    titleId: element.todo_id,
                    title: element.name,
                    createDate: element.createDate,
                    success: element.success
                })
            });
            res.json({todoList: todoList});
        }).catch( err => {
            res.status(500).json(err);
        });
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

        jclqDbController.insertTodo(title, uid).then( result => {
            jclqDbController.selectTodoList(uid).then( rows => {
                const todoList = [];
                delete rows.meta;
                rows.forEach(element => {
                    todoList.push({
                        titleId: element.todo_id,
                        title: element.name,
                        createDate: element.createDate,
                        success: element.success
                    })
                });
                res.json({todoList});
            }).catch( err => {
                res.status(500).json(err);
            });
        }).catch( err => {
            res.status(500).json(err);
        });
    });


    /* todo 성공여부 업데이트
    * request
    *   (url):titleid  변경할 todo식별번호
    *   success: 
    * response
    *   todoList: [{
    *       titleId: todo 식별번호
    *       title: todo 제목
    *       createDate: todo 생성일자
    *       success: todo 성공여부
    *   }, ...]  
    *
    */
    app.put('/app/todo/:titleid', function(req, res){
        const success = req.body.success;
        const uid = req.session.uid;
        const titleId = req.params.titleid;

        console.log(success);

        jclqDbController.updateTodo(success.toString(), titleId).then( result => {
            jclqDbController.selectTodoList(uid).then( rows => {
                const todoList = [];
                delete rows.meta;
                rows.forEach(element => {
                    todoList.push({
                        titleId: element.todo_id,
                        title: element.name,
                        createDate: element.createDate,
                        success: element.success
                    })
                });
                res.json({todoList});
            }).catch( err => {
                res.status(500).json(err);
            });
        }).catch( err => {
            res.status(500).json(err);
        });
    });


    /* todo목록 삭제
    * request
    *   (url):titleid  삭제할 todo 식별번호
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

        jclqDbController.deleteTodo(titleId).then( result => {
            jclqDbController.selectTodoList(uid).then( rows => {
                const todoList = [];
                delete rows.meta;
                rows.forEach(element => {
                    todoList.push({
                        titleId: element.todo_id,
                        title: element.name,
                        createDate: element.createDate,
                        success: element.success
                    })
                });
                res.json({todoList});
            }).catch( err => {
                res.status(500).json(err);
            });
        }).catch( err => {
            res.status(500).json(err);
        });
        
    });


    // Page Not Found 미들웨어
    app.use(function(req, res, next){
        res.render('notfound.html');
    });
    
}