const path = require("path");


//DB가 준비되어야 서버가 실행되도록 하고싶다.
const db = require("./dbinit"); 

const express = require('express'); //express 모듈 import
const session = require('express-session');
const app = express(); //express app선언
const port = 30000 //port는 일단 3000으로 하자

app.set('views', path.join(__dirname,'/views')); //views 의 경로를 지정
app.set('view engine', 'ejs'); //view engins을 ejs로 설정하지만, 템플릿 엔진을 사용하지 않을 것 같다.
app.engine('html', require('ejs').renderFile);

//미들웨어가 뭔지 좀 더 알아보자
const myLogger = function(req, res, next) {
    console.log("server.js:11 Logged " + req);
    req = Date.now();
    next();
}

app.use(myLogger);

app.use(session({
    secret: 'abcdefg',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public')); //정적 파일의 디렉토리 이름을 지정하면 파일을 제공해준다
app.use(express.urlencoded({ extended: true }));
// app.use(express.text());
app.use(express.json());


const router = require('./router/main')(app, db);
//미들웨어가 post request를 파싱한 후 이 라우터에 전달한다
//라고 이해하면 되나

const server = app.listen(port, function() {
    console.log(`Express server has started on port ${port}`);
})