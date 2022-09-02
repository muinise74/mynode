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
    }
});

module.exports = router;