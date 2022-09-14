let express = require('express');
let router = express.Router();
let cron = require('node-cron');

cron.schedule('* * * * *', () => {
    var mapper = 'BatchMapper';
    var crud = 'insert';
    var mapper_id = 'insertBatchLog';

    var param = {
        is_BatchNm : 'Test Batch',
        is_BatchLog : 'Insert Test Batch'
    };

    console.log('====== 배치 실행 / 테스트 배치 ======');

    const mysql = require('mysql');
    const mybatisMapper = require('mybatis-mapper');

    const connection = mysql.createConnection({
        host: "react200.canaevtvbrpb.ap-northeast-2.rds.amazonaws.com",
        port: "3306",
        database: 'react',
        user: "admin",
        password: "moon200374"
    });

    mybatisMapper.createMapper(['./models/'+mapper+'.xml'])
    var time1 = new Date();
    console.log("== "+ time1 +" ==");
    console.log("\n Called Mapper Name : "+ mapper);

    var format = {
        language : 'sql',
        indent : ' '
    }
    try {
        var query = mybatisMapper.getStatement(mapper, mapper_id, param, format);
    console.log("\n======== Node Mybatis Query Log Start ========");
    console.log("* mapper namespace : " + mapper + "." + mapper_id +"*\n");
    console.log(query + "\n");

    connection.connect();
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log("db error >>>>>> " + error);
        }

        var time2 = new Date();
        console.log("<< " + time2 + " >>");
        console.log("== Result Data List ==\n",results);
        console.log("========= Mybatis Query Log End =========");
    });
    connection.end();
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;