var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res, next) => {
    var type = req.query.type;
    if(type == "signup"){
      //회원가입 정보 삽입
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'UserMapper';//mybatis xml 파일명
        req.body.crud = 'insert';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'insertUser';
    
        var myPlaintextPassword = req.body.is_Password;
        if(myPlaintextPassword != '' && myPlaintextPassword != undefined ){
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
              req.body.is_Password = hash;
              router.use('/', dbconnect_Module);
              next('route')
            });
          });
        }else{
          router.use('/', dbconnect_Module);
          next('route')
        }
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }
  });
  
  module.exports = router;