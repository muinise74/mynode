var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send({'message':'Node Post Success'});
});

module.exports = router;
