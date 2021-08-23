
const express = require('express');
const router = express.Router();
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
// 실제로는 /api/todolist 라우트를 처리하는 메소드가 된다.
router.get('/todolist', function(req, res) {
   // console.log('express api/todolist');
   
    // res.json({
    //     success:'true'
    // })
    //res.send({name:"suhyeon1137", name2:"dmswn4011"})

    connection.query('SELECT * FROM todolist', function (err, rows) {
        if (err) throw err;
        res.send(rows);
      });
})


module.exports = router;