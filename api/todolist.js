
const express = require('express');

const router = express.Router();

// 실제로는 /api/todolist 라우트를 처리하는 메소드가 된다.
router.get('/todolist', function(req, res) {
    console.log('express api/todolist');
    // 조회
    // res.json({
    //     success:'true'
    // })
    res.send({name:"suhyeon1137", name2:"dmswn4011"})
})


module.exports = router;