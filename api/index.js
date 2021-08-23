// <project root>/api/index.js
const express = require('express');
const todolist = require('./todolist');
// express 인스턴스 생성
const app = express()

//mysql 연결
const mysql = require('mysql')
//connection 객체 생성
var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'0000',
    database:'todolist'
})
//connect
connection.connect(function(err){
    if(err){
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }else{
        console.log('mysql connect success')
    }
}) 

// 실제로는 /api 라우트를 처리하는 메소드가 된다.
// app.get('/', function(req, res) {
//   res.send('EXPRESS')
// })

app.use(todolist);

// 모듈로 사용할 수 있도록 export
// 앱의 /api/* 라우트로 접근하는 모든 요청은 모두 app 인스턴스에게 전달된다.
module.exports = {
  path: '/api',
  handler: app
}