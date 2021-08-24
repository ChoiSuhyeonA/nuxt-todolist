const express = require('express');
const router = express.Router();
const mysql = require('mysql')

router.use(express.json());

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

router.post('/todolist/insert', function(req, res){

    newTodoItem = req.body.data.value
    console.log('server axios get newTodoItem:', newTodoItem)
    connection.query('INSERT INTO todolist (name) values(?)  ', [newTodoItem],function(err, result){
        if(err) throw err;
        else{
            console.log("insert sql success");
        }
       
    } )
    res.send(true);
})


// router.get('/todolist/insert', function(req, res){
//     newTodoItem =req.query.value
//     console.log('server axios get newTodoItem:'+ newTodoItem)
//     connection.query('INSERT INTO todolist values(?)  ', [newTodoItem],function(err, result){
//         if(err) throw err;
//         else{
//             console.log("insert sql success");
//         }
       
//     } )
// })

router.post('/todolist/delete', function(req, res){
    deleteTodoItem =  req.body.data.value
    connection.query('DELETE FROM todolist WHERE id = ?',[deleteTodoItem], function(err, result){
        if(err) throw err;
        else{
            console.log("Number of todolist deleted" );
        }
        
    })
    res.send(true);
})

router.post('/todolist/alldelete', function(req, res){
    connection.query('TRUNCATE todolist', function(err, result){
        if(err) throw err;
        else{
            console.log("All delete data");
        }
    })
    res.send(true);
})
module.exports = router;