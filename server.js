const path = require("path");
const fs = require("fs");


//DB가 준비되어야 서버가 실행되도록 하고싶다.
const db = require("./dbinit"); 

const express = require('express'); //express 모듈 import
const app = express(); //express app선언
const port = 3000 //port는 일단 3000으로 하자


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

app.use(express.static('public')); //정적 파일의 디렉토리 이름을 지정하면 파일을 제공해준다
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./router/main')(app)
//router 정의는 따로 정리하는게 보통이라고 한다
//그리고 위의 use들은 미들웨어 함수를 수행하기 때문에
//미들웨어가 post request를 파싱한 후 이 라우터에 전달한다
//라고 이해하면 되나

const server = app.listen(30000, function() {
    console.log(`Express server has started on port ${port}`);
})