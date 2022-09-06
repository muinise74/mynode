let express = require('express');

let router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended : true
}))

router.post('/',(req,res,next) => {
    let type = req.query.type;
    console.log(type);
    if(type == 'list') {
        try {
            var dbconnectModule = require('./dbconnect_Module');

            req.body.mapper = 'SwToolsMapper';
            req.body.crud = 'select';
            req.body.mapper_id = 'selectSwToolsList';
            
            router.use('/',dbconnectModule);
            next('route');
        } catch (error) {
            console.log('Module > dbConnectError : ' + error);
        }
    } else if (type == 'save') {
        // SwTool 관리자 저장
        try {
            var dbconnectModule = require('./dbconnect_Module');

            req.body.mapper = 'SwToolsMapper';
            req.body.crud = 'insert';
            req.body.mapper_id = 'insertSwTools';
            
            router.use('/',dbconnectModule);
            next('route');
        } catch (error) {
            console.log("Module > dbConnectError : "+error);
        }
    } else if (type == 'detail') {
        try {
            var dbconnectModule = require('./dbconnect_Module');

            req.body.mapper = 'SwToolsMapper';
            req.body.crud = 'select';
            req.body.mapper_id = 'selectSwToolsDetail';
            
            router.use('/',dbconnectModule);
            next('route');
        } catch (error) {
            console.log("Module > dbConnectError : "+error);
        }
    } else if (type == "modify") {
        try {
            var dbconnectModule = require('./dbconnect_Module');

            req.body.mapper = 'SwToolsMapper';
            req.body.crud = 'update';
            req.body.mapper_id = 'updateSwTools';
            
            router.use('/',dbconnectModule);
            next('route');
        } catch (error) {
            console.log("Module > dbConnectError : "+error);
        }
    }
});

module.exports = router;